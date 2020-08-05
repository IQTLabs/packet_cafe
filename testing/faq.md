# FAQ

## Why am I getting a 'Mounts denied' error?

```text
ERROR: for workers  Cannot start service workers: Mounts denied: 
The paths /definitions and /files
are not shared from OS X and are not known to Docker.
You can configure shared paths from Docker -> Preferences... -> File Sharing.
See https://docs.docker.com/docker-for-mac/osxfs/#namespaces for more info.
.
ERROR: Encountered errors while bringing up the project.
```

macOS has limitations on which paths Docker is allowed to mount. To get around this, export the environment variable `VOL_PREFIX` to a path that Docker can mount, then try re-running `docker-compose`. Here's an example:

```text
export VOL_PREFIX=~/packet_cafe_data
docker-compose up -d --build
```

## Browsing to http://0.0.0.0/ shows "This page isn't working", how come?

It's likely that the `lb` \(load balancer\) container has become unhealthy. It can checked like this \(scroll over to the `status` section and check the `packet_cafe_lb_1` container's health\):

```text
$ docker ps
CONTAINER ID        IMAGE                                      COMMAND                  CREATED             STATUS                   PORTS                                                 NAMES
9b5329b26157        iqtlabs/packet_cafe_admin:latest       "/bin/sh -c 'gunicor…"   2 minutes ago       Up 2 minutes (healthy)   0.0.0.0:5001->5001/tcp                                packet_cafe_admin_1
8d441ad568f9        iqtlabs/packet_cafe_ui:latest          "node server.js"         2 minutes ago       Up 2 minutes (healthy)   5000/tcp                                              packet_cafe_ui_1
383aeeff6ebb        iqtlabs/packet_cafe_messenger:latest   "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes (healthy)   4369/tcp, 5671-5672/tcp, 15671-15672/tcp, 25672/tcp   packet_cafe_messenger_1
1a41d9bb7a32        iqtlabs/packet_cafe_redis:latest       "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes (healthy)   6379/tcp                                              packet_cafe_redis_1
6fa632202e20        iqtlabs/packet_cafe_web:latest         "/bin/sh -c '(nginx)…"   2 minutes ago       Up 2 minutes (healthy)   8000/tcp                                              packet_cafe_web_1
2550c017ac24        iqtlabs/packet_cafe_lb:latest          "supervisord -c /etc…"   2 minutes ago       Up 2 minutes (healthy)   0.0.0.0:80->80/tcp                                    packet_cafe_lb_1
e2ddd8527c85        iqtlabs/packet_cafe_workers:latest     "/bin/sh -c '(flask …"   2 minutes ago       Up 2 minutes (healthy)                                                         packet_cafe_workers_1
```

If it, or any of the containers, show as `unhealthy` then restart the service:

```text
docker-compose restart
```



