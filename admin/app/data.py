import json
import os
import socket

import falcon

from .routes import paths
from .routes import version


class Endpoints(object):

    def on_get(self, req, resp):
        endpoints = []
        for path in paths():
            endpoints.append(version()+path)

        resp.body = json.dumps(endpoints)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class IDFiles(object):

    def on_get(self, req, resp):
        path = '/files/id'
        files = []
        for r, d, f in os.walk(path):
            for file in f:
                files.append(os.path.join(r, file))
        resp.body = json.dumps(files, indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class IDResults(object):

    def on_get(self, req, resp):
        path = '/id'
        files = []
        for r, d, f in os.walk(path):
            for file in f:
                files.append(os.path.join(r, file))
        resp.body = json.dumps(files, indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class IDs(object):

    def on_get(self, req, resp):
        # TODO
        path = '/files/id'
        ids = []
        for r, d, f in os.walk(path):
            for directory in d:
                if r == path:
                    ids.append(directory)
        ids  = list(set(ids))
        resp.body = json.dumps(ids, indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Info(object):

    def on_get(self, req, resp):
        resp.body = json.dumps({'version': 'v0.1.0', 'hostname': socket.gethostname()})
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Logs(object):

    def on_get(self, req, resp, req_id):
        # TODO
        resp.body = 'TODO'
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200
