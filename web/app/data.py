import base64
import json
import os
import socket
import uuid

import falcon
import pika

from .routes import paths
from .routes import version


def max_body(limit):

    def hook(req, resp, resource, params):
        length = req.content_length
        print(limit)
        print(length)
        if length is not None and length > limit:
            msg = ('The size of the request is too large. The body must not '
                   'exceed ' + str(limit) + ' bytes in length.')

            raise falcon.HTTPPayloadTooLarge(
                'Request body is too large', msg)

    return hook


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


class Start(object):

    def setup_rabbit(self):
        params = pika.ConnectionParameters(host='messenger', port=5672)
        self.connection = pika.BlockingConnection(params)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='task_queue', durable=True)

    def on_get(self, req, resp, pipeline):
        uid = str(uuid.uuid4()).replace('-', '')
        failed = False
        image = None
        filepath = None
        try:
            pipeline = json.loads(base64.urlsafe_b64decode(pipeline).decode('utf-8'))
            pipeline['id'] = uid
            if 'image' in pipeline:
                image = pipeline['image']
            else:
                failed = True
            if 'filepath' in pipeline:
                filepath = pipeline['filepath']
            else:
                failed = True
            self.setup_rabbit()
            self.channel.basic_publish(exchange='',
                                       routing_key='task_queue',
                                       body=json.dumps(pipeline),
                                       properties=pika.BasicProperties(
                                       delivery_mode=2,
                                       ))
        except Exception as e:  # pragma: no cover
            print(str(e))

        resp.body = 'id: {0}'.format(uid)
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

    @falcon.before(max_body(100 * 1024 * 1024))
    def on_options(self, req, resp):
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')

    @falcon.before(max_body(100 * 1024 * 1024))
    def on_post(self, req, resp):

        # Retrieve input_file
        print(req.has_param('file'))
        input_file = req.get_param('file')

        # Test if the file was uploaded
        if input_file.filename:
            # Retrieve filename
            filename = input_file.filename
            print(filename)

            # Define file_path
            file_path = os.path.join('/files', filename)
            print(file_path)

            # Write to a temporary file to prevent incomplete files from being used
            temp_file_path = file_path + '~'
            print(temp_file_path)

            open(temp_file_path, 'wb').write(input_file.file.read())

            # know the file has been  saved to disk, move it into place.
            os.rename(temp_file_path, file_path)
        else:
            print("Error")

        resp.status = falcon.HTTP_201

