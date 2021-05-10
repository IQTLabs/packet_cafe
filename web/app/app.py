import falcon

from falcon_cors import CORS
from falcon_multipart.middleware import MultipartMiddleware

from .routes import routes
from .routes import version


cors = CORS(allow_all_origins=True, allow_all_methods=True, allow_all_headers=True)
api = application = falcon.App(middleware=[cors.middleware, MultipartMiddleware()])

r = routes()
for route in r:
    api.add_route(version()+route, r[route])
