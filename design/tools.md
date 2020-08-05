# Tools

Currently Packet Café supports 9 tools, but is flexible to easily add or remove tools as needed. Each tool is defined [here](https://github.com/IQTLabs/packet_cafe/blob/master/workers/workers.json), which is a JSON file, where each entry looks something like this:

```text
    {
      "name": "snort",
      "image": "iqtlabs/snort",
      "version": "v0.11.6",
      "labels": "",
      "stage": "analysis",
      "viewableOutput": true,
      "environment": {
        "rabbit": "true"
      },
      "contentType": "application/json",
      "outputs": [
        "rabbitmq"
      ],
      "inputs": [
        "pcap",
        "pcapng"
      ]
    }
```

Each tool is run in a Docker container, and must be an image that is accessible to the engine being used to serve up Docker images and run Docker containers. By default, if you're running the Docker engine, it will point to the [Docker Hub](https://hub.docker.com/) but that can be overridden with your own registry of choice.

### name

> This is the given name of the tool, it is required, but can be whatever you like.

### image

> This is the name of the image that will get pulled from an existing registry.

### version

> This acts as the `tag` of the image being pulled. Most registries will default to the `latest` tag, if this is not specified it will use that default.

### labels

> These can be added as a way to reference specific tools or groups of tools if desired. Currently they are not being used for anything.

### stage

> This is the logical stage at which you wish to run this tool. It will bind this tool to an isolated network for all tools in this specific stage. Available stages are: `admin`, `frontend`, `backend`, `analysis`, `preprocessing`, and `results`.

### viewableOutput

> This is a boolean that tells the frontend how to show results for the tool.

### contentType

> This allows the tool to specify how the results should be represented in the frontend.

### outputs

> Allows a list to be specified of expected output types of a tool.

### inputs

> Requires a list of expected input types, which can be types of files or other tools, allowing a pipeline of tools to run in a specific order if desired.

{% hint style="info" %}
Note there are other options such as `environment` or `command` which mirror the [available parameters](https://docker-py.readthedocs.io/en/stable/containers.html) of starting a Docker container that allow you change the behavior of the tool if desired.
{% endhint %}

