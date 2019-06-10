# Packet Café

Using docker-compose:
```
docker-compose up -d --build --scale web=3 --scale workers=3
```

Using kubernetes (assuming your default orchestrator is set to k8s for stacks):
```
docker stack deploy -c docker-compose.yml packet_cafe
```

Testing:
```
ab -n 100 -c 10 http://0.0.0.0/v1/start/eyJpbWFnZSI6ImJmaXJzaC9yZXRpY3VsYXRlLXNwbGluZXMiLCAiYmFyIjogImJsYWgifQ==
```
