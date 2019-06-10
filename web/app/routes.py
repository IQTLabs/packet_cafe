def routes():
    from .data import Endpoints, Info, Start, Status, Stop
    endpoints = Endpoints()
    p = paths()
    info = Info()
    start = Start()
    status = Status()
    stop = Stop()
    funcs = [endpoints, info, start, status, stop]
    return dict(zip(p, funcs))


def paths():
    return ['', '/info', '/start/{pipeline}', '/status/{req_id}', '/stop/{req_id}']


def version():
    return '/v1'
