import json
import os
import shutil
import socket

import falcon

import routes


# NOTE: The following variables are replicated in web/app/data.py.
LAST_SESSION_STATE = '/files/last_session_id'
LAST_REQUEST_STATE = '/files/last_request_id'


# NOTE: The following function is replicated in web/app/data.py.
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


# NOTE: The following function is replicated in web/app/data.py.
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


# NOTE: The following function is replicated in web/app/data.py.
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


# NOTE: The following function is replicated in web/app/data.py.
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


class Endpoints(object):

    def on_get(self, req, resp):
        endpoints = []
        for path in routes.paths():
            endpoints.append(routes.version()+path)

        resp.text = json.dumps(endpoints)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class IDDelete(object):

    def on_get(self, req, resp, session_id):
        id_path = f'/id/{session_id}'
        file_path = f'/files/{session_id}'
        last_session_id = get_last_session_id()
        last_request_id = get_last_request_id()

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
                # Remove state
                if session_id == last_session_id:
                    set_last_session_id(sess_id=None)
                    set_last_request_id(req_id=None)
                resp.media = {'status': 'Success'}
                resp.status = falcon.HTTP_200


class IDFiles(object):

    def on_get(self, req, resp):
        path = '/files'
        files = []
        for r, d, f in os.walk(path):
            for file in f:
                files.append(os.path.join(r, file))
        resp.text = json.dumps(files, indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class IDResults(object):

    def on_get(self, req, resp):
        path = '/id'
        files = []
        for r, d, f in os.walk(path):
            for file in f:
                files.append(os.path.join(r, file))
        resp.text = json.dumps(files, indent=4)
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
        resp.text = json.dumps(ids, indent=4)
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Info(object):

    def on_get(self, req, resp):
        resp.text = json.dumps({'version': 'v0.1.0', 'hostname': socket.gethostname()})
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200


class Logs(object):

    def on_get(self, req, resp, req_id):
        # TODO
        resp.text = 'TODO'
        resp.content_type = falcon.MEDIA_TEXT
        resp.status = falcon.HTTP_200
