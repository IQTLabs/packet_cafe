#!/usr/bin/env python3
import bjoern
import falcon

from falcon_cors import CORS
from falcon_multipart.middleware import MultipartMiddleware

import routes


cors = CORS(allow_all_origins=True, allow_all_methods=True, allow_all_headers=True)
api = application = falcon.API(middleware=[cors.middleware, MultipartMiddleware()])

r = routes.routes()
for route in r:
    api.add_route(routes.version()+route, r[route])


if __name__ == "__main__":
    bjoern.run(api, "0.0.0.0", 5001)
