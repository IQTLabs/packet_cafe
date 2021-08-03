def routes():
    import data
    p = paths()
    endpoints = data.Endpoints()
    id_delete = data.IDDelete()
    id_files = data.IDFiles()
    id_results = data.IDResults()
    ids = data.IDs()
    info = data.Info()
    logs = data.Logs()
    funcs = [endpoints, id_delete, id_files, id_results, ids, info, logs]
    return dict(zip(p, funcs))


def paths():
    return [
        '',
        '/id/delete/{session_id}',
        '/id/files',
        '/id/results',
        '/ids',
        '/info',
        '/logs/{req_id}'
    ]


def version():
    return '/v1'
