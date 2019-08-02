def routes():
    from .data import Endpoints, Id, Info, Results, Status, Stop, Tools, Upload
    endpoints = Endpoints()
    p = paths()
    id_files = Id()
    info = Info()
    results = Results()
    status = Status()
    stop = Stop()
    upload = Upload()
    tools = Tools()
    funcs = [endpoints, id_files, info, results, status, stop, tools, upload]
    return dict(zip(p, funcs))


def paths():
    return ['', '/id/{req_id}/{tool}/{counter}/{filename}', '/info', '/results/{tool}/{counter}/{req_id}', '/status/{req_id}', '/stop/{req_id}', '/tools', '/upload']


def version():
    return '/api/v1'
