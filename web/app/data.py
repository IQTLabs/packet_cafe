import errno
import base64
import json
import os
import socket
import uuid

from string import Template

import falcon
import jinja2
import magic
import pika

from redis import StrictRedis

from .routes import paths
from .routes import version
from .helpers import load_tools


ACCEPTED_FILE_TYPES = ['pcap', 'pcapng']


# NOTE: The following variables are replicated in admin/app/data.py.
LAST_SESSION_STATE = '/files/last_session_id'
LAST_REQUEST_STATE = '/files/last_request_id'


# NOTE: The following function is replicated in admin/app/data.py.
def get_last_session_id():
    """Return the last session ID if one is saved, else None."""
    sess_id = None
    if os.path.exists(LAST_SESSION_STATE):
        try:
            with open(LAST_SESSION_STATE, 'r') as sf:
                sess_id = sf.read().strip()
        except Exception:  # noqa
            pass
    return sess_id


# NOTE: The following function is replicated in admin/app/data.py.
def set_last_session_id(sess_id=None):
    """
    Save the last session ID for later use.

    If sess_id is None, remove the saved state.

    Return True if successful, else False
    """
    if sess_id is None:
        os.remove(LAST_SESSION_STATE)
        return True
    else:
        try:
            with open(LAST_SESSION_STATE, 'w') as sf:
                sf.write(str(sess_id) + '\n')
        except:  # noqa
            return False
    return True


# NOTE: The following function is replicated in admin/app/data.py.
def get_last_request_id():
    """
    Return the last request ID if one is saved and it exists
    in the last session, else None.
    """
    _req_id = None
    try:
        with open(LAST_REQUEST_STATE, 'r') as sf:
            _req_id = sf.read().strip()
    except FileNotFoundError:
        pass
    return _req_id


# NOTE: The following function is replicated in admin/app/data.py.
def set_last_request_id(req_id=None):
    """
    Save the last request ID for later use.

    If req_id is None, remove the saved state.

    Return True if successful, else False
    """
    if req_id is None:
        os.remove(LAST_REQUEST_STATE)
        return True
    else:
        try:
            with open(LAST_REQUEST_STATE, 'w') as sf:
                sf.write(str(req_id) + '\n')
        except:  # noqa
            return False
    return True

def load_template(name):
    path = os.path.join('app/templates', name)
    with open(os.path.abspath(path), 'r') as fp:
        return jinja2.Template(fp.read())


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

        resp.body = json.dumps(endpoints, indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Id(object):

    def on_get(self, req, resp, session_id, req_id, tool, pcap, counter, filename):
        resp.body = 'file not found'
        with open('/id/{0}/{1}/{2}/{3}/{4}/{5}'.format(session_id, req_id, tool, pcap, counter, filename), 'rb') as f:
            resp.body = base64.decodestring(f.read())
        resp.content_type = falcon.MEDIA_PNG
        resp.status = falcon.HTTP_200


class Ids(object):

    def on_get(self, req, resp, session_id):
        obj = []
        try:
            ids = os.listdir(f'/id/{session_id}')
            for id_dir in ids:
                tools = os.listdir(f'/id/{session_id}/{id_dir}')
                filenames = [ filename for filename in os.listdir(f'/files/{session_id}/{id_dir}') if os.path.isfile(os.path.join(f'/files/{session_id}/{id_dir}', filename)) ]
                if not filenames:
                    filenames = ['none']
                out_file = filenames[0]
                orig_file = filenames[-1]
                if f'trace_{id_dir}_' in orig_file:
                    out_file = filenames[-1]
                    orig_file = filenames[0]
                id_dict = {'id': id_dir, 'filename': out_file, 'tools': tools, 'original_filename': orig_file}
                obj.append(id_dict)
        except Exception as e:
            print("session doesn't exist yet: {0}".format(str(e)))
        resp.body = json.dumps(obj)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200

class Info(object):

    def on_get(self, req, resp):
        resp.body = json.dumps(
            {
                'version': 'v0.1.0',
                'hostname': socket.gethostname(),
                'last_session_id': get_last_session_id(),
                'last_request_id': get_last_request_id(),
            },
            indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Raw(object):

    def on_options(self, req, resp, tool, counter, session_id, req_id):
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.status = falcon.HTTP_OK

    def on_get(self, req, resp, tool, counter, session_id, req_id):
        body = '{}'
        try:
            with open('/id/{0}/{1}/{2}/metadata.json'.format(session_id, req_id, tool)) as f:
                body = json.dumps(json.load(f), indent=4)
        except Exception as e:  # pragma: no cover
            print('failed: {0}'.format(str(e)))
        resp.body = body

        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200

class Results(object):

    def pcapplot(self, session_id, req_id):
        tool = 'pcapplot'
        packets = 'Unknown'
        capture_time = 'Unknown'
        host = 'Unknown'
        filename = 'Unknown'
        asn_file_path = ''
        private_file_path = ''
        src_file_path = ''
        dest_file_path = ''
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
'''

        try:
            with open('/id/{0}/{1}/{2}/metadata.json'.format(session_id, req_id, tool)) as f:
                metadata = json.load(f)
            for rec in metadata:
                filename = rec['pcap']
                packets, capture_time, host = rec[filename]
                asn_file_path = '/api/v1/id/{0}/{1}/{2}/{3}/1/map_ASN-{3}.png'.format(session_id, req_id, tool, rec['pcap'], filename)
                private_file_path = '/api/v1/id/{0}/{1}/{2}/{3}/2/map_Private_RFC_1918-{4}.png'.format(session_id, req_id, tool, rec['pcap'], filename)
                src_file_path = '/api/v1/id/{0}/{1}/{2}/{3}/3/map_Source_Ports-{4}.png'.format(session_id, req_id, tool, rec['pcap'], filename)
                dest_file_path = '/api/v1/id/{0}/{1}/{2}/{3}/4/map_Destination_Ports-{4}.png'.format(session_id, req_id, tool, rec['pcap'], filename)
                list_obj = '''\
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
'''
                list_obj = Template(list_obj).safe_substitute(asn_file_path=asn_file_path, private_file_path=private_file_path, src_file_path=src_file_path, \
                  dest_file_path=dest_file_path, host=host, filename=filename[:40]+'...', packets=packets, capture_time=capture_time)
                html_str += list_obj
        except Exception as e:  # pragma: no cover
            print('failed: {0}'.format(str(e)))

        html_str += '''\
</ul>

</body>
</html>
'''
        return html_str

    def on_options(self, req, resp, tool, counter, session_id, req_id):
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.status = falcon.HTTP_OK

    def on_get(self, req, resp, tool, counter, session_id, req_id):
        # check if id exists, and if the tool exists and has results
        # if counter is 0, get all of them
        # TODO actually use the counter param
        resp.content_type = falcon.MEDIA_HTML
        if tool == 'pcapplot':
            body = self.pcapplot(session_id, req_id)
            resp.body = body
        else:
            body = '{}'
            try:
                with open('/id/{0}/{1}/{2}/metadata.json'.format(session_id, req_id, tool)) as f:
                    body = json.dumps(json.load(f), indent=4)
            except Exception as e:  # pragma: no cover
                print('failed: {0}'.format(str(e)))
            template = load_template('json_viewer.j2')
            resp.body = template.render(results=body)

        resp.status = falcon.HTTP_200


    def on_post(self, req, resp, tool, counter, session_id, req_id):
        message = req.media

        if message['type'] == 'data':
            # Define file_path
            # TODO validation
            file_dir = '/id/{0}/{1}/{2}/{3}/{4}'.format(session_id, message['id'], message['results']['tool'], message['pcap'], message['results']['counter'])
            file_path = os.path.join(file_dir, message['img_path'].split('/')[-1])

            mkdir_p(file_dir)

            # Write to a temporary file to prevent incomplete files from being used
            temp_file_path = file_path + '~'
            open(temp_file_path, 'wb').write(message['data'].encode('utf-8'))

            # know the file has been  saved to disk, move it into place.
            os.rename(temp_file_path, file_path)
        else:
            file_dir = '/id/{0}/{1}/{2}'.format(session_id, message['id'], message['results']['tool'])
            file_path = os.path.join(file_dir, 'metadata.json')
            mkdir_p(file_dir)

            try:
                with open(file_path, 'r') as infile:
                    existing = json.load(infile)
                if isinstance(existing, list):
                    existing.insert(0, message['data'])
                else:
                    existing = [message['data'], existing]
            except Exception as e:  # pragma: no cover
                existing = [message['data']]
            with open(file_path, 'w') as outfile:
                outfile.write(json.dumps(existing))

        resp.media = {'message': message}
        resp.status = falcon.HTTP_201


class Status(object):

    def setup_redis(self, host='redis', port=6379, db=0):
        self.r = None
        try:
            self.r = StrictRedis(host=host, port=port, db=db,
                                 socket_connect_timeout=2, decode_responses=True)
        except Exception as e:  # pragma: no cover
            print('Failed connect to Redis because: {0}'.format(str(e)))
        return self.r

    def on_get(self, req, resp, session_id, req_id):
        self.setup_redis()

        statuses = self.r.hgetall(req_id+'_status')
        for status in statuses:
            statuses[status] = json.loads(statuses[status])
        resp.body = json.dumps(statuses)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Stop(object):

    def on_get(self, req, resp, req_id):
        # TODO
        resp.body = 'stopped' + req_id
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Tools(object):

    def on_get(self, req, resp):
        tools = load_tools()
        resp.body = json.dumps(tools, indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Upload(object):

    def on_options(self, req, resp):
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')
        resp.status = falcon.HTTP_OK

    def on_post(self, req, resp):

        # Retrieve input_file
        session_id = req.get_param('sessionId')
        input_file = req.get_param('file')

        # Test if the file was uploaded
        if input_file.filename:
            # Retrieve file basename (avoid path traversal)
            filename = os.path.basename(input_file.filename)

            uid = str(uuid.uuid4()).replace('-', '')
            file_dir = '/files/{0}/{1}'.format(session_id, uid)
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

                # Save state
                set_last_session_id(sess_id=session_id)
                set_last_request_id(req_id=uid)

                resp.media = {'filename': filename, 'uuid': uid, 'status': 'Success'}
                resp.status = falcon.HTTP_201
            else:
                os.remove(file_path)
                resp.media = {'status': 'Error', 'error': 'Invalid file type. Acceptable file formats are {0}'.format(ACCEPTED_FILE_TYPES)}
                resp.status = falcon.HTTP_200
        else:
            try:
                os.remove(file_path)
            except Exception as e:  # pragma: no cover
                print(f'Failed to delete {file_path} because: {e}')
            resp.media = {'status': 'Error'}
            resp.status = falcon.HTTP_500
