def routes():
    from .data import Endpoints, Info, Results, Status, Stop, Upload
    endpoints = Endpoints()
    p = paths()
    info = Info()
    results = Results()
    status = Status()
    stop = Stop()
    upload = Upload()
    funcs = [endpoints, info, results, status, stop, upload]
    return dict(zip(p, funcs))


def paths():
    return ['', '/info', '/results/{tool}/{counter}/{req_id}', '/status/{req_id}', '/stop/{req_id}', '/upload']


def version():
    return '/v1'
