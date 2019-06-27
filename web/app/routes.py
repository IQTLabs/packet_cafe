def routes():
    from .data import Endpoints, Info, Start, Status, Stop , Upload
    endpoints = Endpoints()
    p = paths()
    info = Info()
    start = Start()
    status = Status()
    stop = Stop()
    upload = Upload()
    funcs = [endpoints, info, start, status, stop, upload ]
    return dict(zip(p, funcs))


def paths():
    return ['', '/info', '/start/{pipeline}', '/status/{req_id}', '/stop/{req_id}', '/upload']


def version():
    return '/v1'
