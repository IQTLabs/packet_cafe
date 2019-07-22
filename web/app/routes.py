def routes():
    from .data import Endpoints, Id, Info, Results, Status, Stop, Upload
    endpoints = Endpoints()
    p = paths()
    id_files = Id()
    info = Info()
    results = Results()
    status = Status()
    stop = Stop()
    upload = Upload()
    funcs = [endpoints, id_files, info, results, status, stop, upload]
    return dict(zip(p, funcs))


def paths():
    return ['', '/id/{req_id}/{tool}/{counter}/{filename}', '/info', '/results/{tool}/{counter}/{req_id}', '/status/{req_id}', '/stop/{req_id}', '/upload']


def version():
    return '/v1'
