def routes():
    from .data import Endpoints, Info, Status, Stop, Upload
    endpoints = Endpoints()
    p = paths()
    info = Info()
    status = Status()
    stop = Stop()
    upload = Upload()
    funcs = [endpoints, info, status, stop, upload]
    return dict(zip(p, funcs))


def paths():
    return ['', '/info', '/status/{req_id}', '/stop/{req_id}', '/upload']


def version():
    return '/v1'
