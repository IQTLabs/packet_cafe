def routes():
    from .data import Endpoints, Id, Ids, Info, Results, Status, Stop, Tools, Upload
    endpoints = Endpoints()
    p = paths()
    id_files = Id()
    ids = Ids()
    info = Info()
    results = Results()
    status = Status()
    stop = Stop()
    upload = Upload()
    tools = Tools()
    funcs = [endpoints, id_files, ids, info, results, status, stop, tools, upload]
    return dict(zip(p, funcs))


def paths():
    return ['', '/id/{session_id}/{req_id}/{tool}/{pcap}/{counter}/{filename}',
            '/ids/{session_id}',
            '/info', '/results/{tool}/{counter}/{session_id}/{req_id}', '/status/{session_id}/{req_id}',
            '/stop/{session_id}/{req_id}', '/tools', '/upload']

def version():
    return '/api/v1'
