import json
import os
import socket
import uuid

import falcon
import magic
import pika

from .routes import paths
from .routes import version


ACCEPTED_FILE_TYPES = ['pcap', 'pcapng']

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
            response['uuid'] = pipline['id']
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


class Info(object):

    def on_get(self, req, resp):
        resp.body = json.dumps({'version': 'v0.1.0', 'hostname': socket.gethostname()})
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Status(object):

    def on_get(self, req, resp, req_id):
        resp.body = 'status' + req_id
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

            # Define file_path
            file_path = os.path.join('/files', filename)

            # Write to a temporary file to prevent incomplete files from being used
            temp_file_path = file_path + '~'
            open(temp_file_path, 'wb').write(input_file.file.read())

            # know the file has been  saved to disk, move it into place.
            os.rename(temp_file_path, file_path)
            uid = str(uuid.uuid4()).replace('-', '')

            # check if file is pcap or pcapng
            file_type = magic.from_file(file_path)
            file_type = file_type.split()[0]

            # make request to start
            if file_type in ACCEPTED_FILE_TYPES:
                pipeline =  {'file_type': file_type, 'id': uid, 'file_path': file_path}
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
