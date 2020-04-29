# macOS

## Deploy

Clone the repository:

```text
git clone https://github.com/CyberReboot/packet_cafe
cd packet_cafe
```

Pick a path store Packet Café data and export it as an environment variable:

```text
export VOL_PREFIX=~/packet_cafe_data
```

{% hint style="warning" %}
 Only some paths are allowed to be mounted with Docker on macOS, make sure to use one that is allowed, for example a path in your home directory: `~/packet_cafe_data`
{% endhint %}

Once a path has been picked for the data to live build and start Packet Café \(from the repository directory\):

```text
docker-compose pull
docker-compose up -d --build
```

Once it has finished, check the for the `healthy` status of the containers:

```text
$ docker ps
CONTAINER ID        IMAGE                                      COMMAND                  CREATED             STATUS                  PORTS                                                 NAMES
0ff880772f43        cyberreboot/packet_cafe_redis:latest       "docker-entrypoint.s…"   26 hours ago        Up 26 hours (healthy)   6379/tcp                                              packet_cafe_redis_1
e0568e748330        cyberreboot/packet_cafe_admin:latest       "/bin/sh -c 'gunicor…"   26 hours ago        Up 26 hours (healthy)   0.0.0.0:5001->5001/tcp                                packet_cafe_admin_1
2153de9c9372        cyberreboot/packet_cafe_ui:latest          "node server.js"         26 hours ago        Up 26 hours (healthy)   5000/tcp                                              packet_cafe_ui_1
6a0a3cd39c79        cyberreboot/packet_cafe_web:latest         "/bin/sh -c '(nginx)…"   26 hours ago        Up 26 hours (healthy)   8000/tcp                                              packet_cafe_web_1
d114f60f9483        cyberreboot/packet_cafe_lb:latest          "supervisord -c /etc…"   26 hours ago        Up 26 hours (healthy)   0.0.0.0:80->80/tcp                                    packet_cafe_lb_1
42fb15415635        cyberreboot/packet_cafe_messenger:latest   "docker-entrypoint.s…"   26 hours ago        Up 26 hours (healthy)   4369/tcp, 5671-5672/tcp, 15671-15672/tcp, 25672/tcp   packet_cafe_messenger_1
55d3a338ef4b        cyberreboot/packet_cafe_workers:latest     "/bin/sh -c '(flask …"   26 hours ago        Up 26 hours (healthy)                                                         packet_cafe_workers_1                                                               
```

Once everything is healthy browse to [http://0.0.0.0/](http://0.0.0.0)



