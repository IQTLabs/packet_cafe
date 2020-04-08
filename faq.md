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



