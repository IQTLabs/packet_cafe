# Orchestration

## Deploying with Orchestration 

Using [stacks](https://docs.docker.com/engine/reference/commandline/stack/), Packet Café can be deployed with [Swarm](https://docs.docker.com/engine/swarm/stack-deploy/) or [Kubernetes](https://docs.docker.com/docker-for-mac/kubernetes/). Once the orchestrator has been set for stacks, deployment is simply:

```text
docker stack deploy -c docker-compose.yml packet_cafe
```



