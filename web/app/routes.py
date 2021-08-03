def routes():
    import data
    endpoints = data.Endpoints()
    p = paths()
    id_files = data.Id()
    ids = data.Ids()
    info = data.Info()
    raw = data.Raw()
    results = data.Results()
    status = data.Status()
    stop = data.Stop()
    upload = data.Upload()
    tools = data.Tools()
    funcs = [endpoints, id_files, ids, info, raw, results, status, stop, tools, upload]
    return dict(zip(p, funcs))


def paths():
    return [
        '',
        '/id/{session_id}/{req_id}/{tool}/{pcap}/{counter}/{filename}',
        '/ids/{session_id}',
        '/info',
        '/raw/{tool}/{counter}/{session_id}/{req_id}',
        '/results/{tool}/{counter}/{session_id}/{req_id}',
        '/status/{session_id}/{req_id}',
        '/stop/{session_id}/{req_id}',
        '/tools',
        '/upload'
    ]


def version():
    return '/api/v1'
