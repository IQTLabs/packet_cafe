import json
import os
import shutil
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


class IDDelete(object):

    def on_get(self, req, resp, session_id):
        id_path = f'/id/{session_id}'
        file_path = f'/files/{session_id}'
        errors = []
        if not (os.path.exists(id_path) or os.path.exists(file_path)):
            print(f"no data found for session: {session_id}")
            resp.media = {'status': 'Error',
                          'error': f'No data found for session {session_id}'}
            resp.status = falcon.HTTP_500
        else:
            # If an internal server error occurred on 'upload' there may
            # be something in /files but not in /id. Handle gracefully.
            if os.path.exists(file_path):
                try:
                    shutil.rmtree(file_path)
                except Exception as e:  # pragma: no cover
                    print(f'Failed to delete {file_path} because: {e}')
                    errors.append(str(e))
            if os.path.exists(id_path):
                try:
                    shutil.rmtree(id_path)
                except Exception as e:  # pragma: no cover
                    print(f'Failed to delete {id_path} because: {e}')
                    errors.append(str(e))
            if bool(len(errors)):
                resp.media = {'status': 'Error',
                              'error(s)': f'{"; ".join(errors)}'}
                resp.status = falcon.HTTP_500
            else:
                resp.media = {'status': 'Success'}
                resp.status = falcon.HTTP_200


class IDFiles(object):

    def on_get(self, req, resp):
        path = '/files'
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
        path = '/files'
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
