import errno
import base64
import json
import os
import socket
import uuid

from string import Template

import falcon
import magic
import pika

from .routes import paths
from .routes import version
from .helpers import load_tools


ACCEPTED_FILE_TYPES = ['pcap', 'pcapng']


def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc:  # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise


class Start(object):

    def setup_rabbit(self):
        params = pika.ConnectionParameters(host='messenger', port=5672)
        self.connection = pika.BlockingConnection(params)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='task_queue', durable=True)

    def request(self, pipeline):
        response = {}
        try:
            self.setup_rabbit()
            self.channel.basic_publish(exchange='',
                                       routing_key='task_queue',
                                       body=json.dumps(pipeline),
                                       properties=pika.BasicProperties(
                                       delivery_mode=2,
                                       ))
            response['status'] = 'Success'
            response['uuid'] = pipeline['id']
        except Exception as e:  # pragma: no cover
            response['status'] = 'Error'
            response['error'] = str(e)

        return response


class Endpoints(object):

    def on_get(self, req, resp):
        endpoints = []
        for path in paths():
            endpoints.append(version()+path)

        resp.body = json.dumps(endpoints)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Id(object):
    def on_get(self, req, resp, req_id, tool, counter, filename):
        with open('/id/{0}/{1}/{2}/{3}'.format(req_id, tool, counter, filename), 'rb') as f:
            resp.body = base64.decodestring(f.read())
        resp.content_type = falcon.MEDIA_PNG
        resp.status = falcon.HTTP_200


class Info(object):

    def on_get(self, req, resp):
        resp.body = json.dumps({'version': 'v0.1.0', 'hostname': socket.gethostname()})
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Results(object):

    def pcapplot(self, req_id):
        tool = 'pcapplot'
        packets = 'Unknown'
        capture_time = 'Unknown'
        host = 'Unknown'
        filename = 'Unknown'
        asn_file_path = ''
        private_file_path = ''
        src_file_path = ''
        dest_file_path = ''
        try:
            with open('/id/{0}/{1}/metadata.json'.format(req_id, tool)) as f:
                metadata = json.load(f)
            for rec in metadata:
                filename = rec
            packets, capture_time, host = metadata[filename]
            asn_file_path = '/id/{0}/{1}/1/map_ASN-{2}.png'.format(req_id, tool, filename)
            private_file_path = '/id/{0}/{1}/2/map_Private_RFC_1918-{2}.png'.format(req_id, tool, filename)
            src_file_path = '/id/{0}/{1}/3/map_Source_Ports-{2}.png'.format(req_id, tool, filename)
            dest_file_path = '/id/{0}/{1}/4/map_Destination_Ports-{2}.png'.format(req_id, tool, filename)
        except Exception as e:  # pragma: no cover
            print('failed: {0}'.format(str(e)))

        html_str = '''\
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PCAP Plot</title>
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/tools/pcapplot/css/style.css">
  <link rel="stylesheet" href="/tools/pcapplot/css/jquery.fancybox.min.css">
  <style>
  body {
   background-image: url("/tools/pcapplot/img/grey.png");
   background-color: #636363;
  }
  #sortable { list-style-type: none; margin: 0; padding: 0; width: 100%; }
  #sortable li { margin: 0 5px 5px 5px; padding: 5px; font-size: 1.2em; height: 1.5em; }
  html>body #sortable li { height: 352px; line-height: 1.2em; }
  .ui-state-highlight { height: 352px; line-height: 1.2em; }
  </style>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="/tools/pcapplot/js/jquery.fancybox.min.js"></script>
  <script>
  $( function() {
    $( "#sortable" ).sortable({
      placeholder: "ui-state-highlight"
    });
    $( "#sortable" ).disableSelection();
  } );
  </script>
</head>
<body>
<p align="right"><font color="yellow"><a href="/" style="color:yellow">Home</a></font></p>
<p><font color="white">Showing maps for the latest capture of each device type, click on a device name to see all maps for that device type. Click and drag rows to reorder them.</font></p>
<p><font color="white">Maps are laid out left to right, top to bottom.  ASN is 1-65536, RFC 1918 is 10.0.0.0/8 followed by 172.16.0.0/12 followed by 192.168.0.0/16 (each square is a /24), Source and Destination Ports are 1-65536.</font></p>
<p><font color="white">Blue is inbound traffic, Red is outbound traffic, Green is mostly bidirectional traffic.</font></p>
<ul id="sortable">

  <li class="ui-state-default" style="background-color: #999999">
      <div id="wrapper">
      <div id="first"><p><b>Host:</b> $host<br /><b>Filename:</b> $filename<br /><b>Packets:</b> $packets<br /><b>Time Window:</b> $capture_time<br /><br /><b>Left to right:</b><br /><br />&emsp;&bull;&nbsp;Public ASN<br />&emsp;&bull;&nbsp;Private RFC 1918<br />&emsp;&bull;&nbsp;Source Ports<br />&emsp;&bull;&nbsp;Destination Ports</p></div>
      <div id="second">
      <a data-fancybox="gallery"
         data-srcset="$asn_file_path"
         data-width="2561"
         data-height="2561"
         data-caption="&lt;b&gt;ASN&lt;/b&gt;&lt;br /&gt; Capture: $filename"
         href="$asn_file_path"><img src="$asn_file_path" alt="" height="350" width="350">
      </a>
      <a data-fancybox="gallery"
         data-srcset="$private_file_path"
         data-width="2891"
         data-height="2891"
         data-caption="&lt;b&gt;Private RFC 1918&lt;/b&gt;&lt;br /&gt; Capture: $filename"
         href="$private_file_path"><img src="$private_file_path" alt="" height="350" width="350">
      </a>
      <a data-fancybox="gallery"
         data-srcset="$src_file_path"
         data-width="2561"
         data-height="2561"
         data-caption="&lt;b&gt;Source Ports&lt;/b&gt;&lt;br /&gt; Capture: $filename"
         href="$src_file_path"><img src="$src_file_path" alt="" height="350" width="350">
      </a>
      <a data-fancybox="gallery"
         data-srcset="$dest_file_path"
         data-width="2561"
         data-height="2561"
         data-caption="&lt;b&gt;Destination Ports&lt;/b&gt;&lt;br /&gt; Capture: $filename"
         href="$dest_file_path"><img src="$dest_file_path" alt="" height="350" width="350">
      </a>
      </div>
      </div>
  </li>

</ul>

</body>
</html>
'''
        return Template(html_str).safe_substitute(asn_file_path=asn_file_path, private_file_path=private_file_path, src_file_path=src_file_path, \
          dest_file_path=dest_file_path, host=host, filename=filename, packets=packets, capture_time=capture_time)

    def on_options(self, req, resp, tool, counter, req_id):
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.status = falcon.HTTP_OK

    def on_get(self, req, resp, tool, counter, req_id):
        # if counter is 0, get all of them
        # TODO actually use the counter param
        if tool == 'pcapplot':
            body = self.pcapplot(req_id)
            resp.body = body
            resp.content_type = falcon.MEDIA_HTML
        else:
            try:
                with open('/id/{0}/{1}/metadata.json'.format(req_id, tool)) as f:
                    body = json.dumps(json.load(f))
            except Exception as e:  # pragma: no cover
                print('failed: {0}'.format(str(e)))
            resp.body = body

        resp.status = falcon.HTTP_200

    def on_post(self, req, resp, tool, counter, req_id):
        message = req.media

        if message['type'] == 'data':
            # Define file_path
            file_dir = '/id/{0}/{1}/{2}'.format(message['id'], message['results']['tool'], message['results']['counter'])
            file_path = os.path.join(file_dir, message['img_path'].split('/')[-1])

            mkdir_p(file_dir)

            # Write to a temporary file to prevent incomplete files from being used
            temp_file_path = file_path + '~'
            open(temp_file_path, 'wb').write(message['data'].encode('utf-8'))

            # know the file has been  saved to disk, move it into place.
            os.rename(temp_file_path, file_path)
        else:
            file_dir = '/id/{0}/{1}'.format(message['id'], message['results']['tool'])
            file_path = os.path.join(file_dir, 'metadata.json')
            mkdir_p(file_dir)

            # Write to a temporary file to prevent incomplete files from being used
            temp_file_path = file_path + '~'
            with open(temp_file_path, 'w') as outfile:
                json.dump(message['data'], outfile)

            # know the file has been  saved to disk, move it into place.
            os.rename(temp_file_path, file_path)

        resp.media = {'message': message}
        resp.status = falcon.HTTP_201


class Status(object):

    def on_get(self, req, resp, req_id):
        resp.body = 'status' + req_id
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200

class Tools(object):

    def on_get(self, req, resp):
        tools = load_tools()
        resp.body = json.dumps(tools)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200

class Stop(object):

    def on_get(self, req, resp, req_id):
        resp.body = 'stopped' + req_id
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Upload(object):

    def on_options(self, req, resp):
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.status = falcon.HTTP_OK

    def on_post(self, req, resp):

        # Retrieve input_file
        input_file = req.get_param('file')

        # Test if the file was uploaded
        if input_file.filename:
            # Retrieve filename
            filename = input_file.filename

            uid = str(uuid.uuid4()).replace('-', '')
            file_dir = '/files/id/{0}'.format(uid)
            mkdir_p(file_dir)
            # Define file_path
            file_path = os.path.join(file_dir, filename)

            # Write to a temporary file to prevent incomplete files from being used
            temp_file_path = file_path + '~'
            open(temp_file_path, 'wb').write(input_file.file.read())

            # know the file has been  saved to disk, move it into place.
            os.rename(temp_file_path, file_path)

            # check if file is pcap or pcapng
            file_type = magic.from_file(file_path)
            file_type = file_type.split()[0]

            # make request to start
            if file_type in ACCEPTED_FILE_TYPES:
                pipeline =  {'file_type': file_type, 'id': uid, 'file_path': file_path, 'rabbit': 'true'}
                response = Start().request(pipeline)
                # TODO
                # check response

                resp.media = {'filename': filename, 'uuid': uid, 'status': 'Success'}
                resp.status = falcon.HTTP_201
            else:
                os.remove(file_path)
                resp.media = {'status': 'Error', 'error': 'Invalid file type. Acceptable file formats are {0}'.format(ACCEPTED_FILE_TYPES)}
                resp.status = falcon.HTTP_200
        else:
            resp.media = {'status': 'Error'}
            resp.status = falcon.HTTP_500
