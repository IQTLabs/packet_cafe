def routes():
    from .data import Endpoints, IDFiles, IDResults, IDs, Info, Logs
    p = paths()
    endpoints = Endpoints()
    id_files = IDFiles()
    id_results = IDResults()
    ids = IDs()
    info = Info()
    logs = Logs()
    funcs = [endpoints, id_files, id_results, ids, info, logs]
    return dict(zip(p, funcs))


def paths():
    return ['', '/id/files', '/id/results', '/ids', '/info', '/logs/{req_id}']


def version():
    return '/v1'
