# Overview

## Background

Packet Café is a platform built for easy-to-use automated network traffic analysis. It is built to be modular and allow for a pipeline of tools that are triggered by different inputs and outputs. Currently the tools supplied are defined [here](https://github.com/IQTLabs/packet_cafe/blob/master/workers/workers.json).

This service accepts [PCAP](https://en.wikipedia.org/wiki/Pcap) files and then processes them against the pipeline of tools providing automated analysis that gets returned in [JSON](https://www.json.org/json-en.html) format. That can then be consumed via the [API](https://iqtlabs.gitbook.io/packet-cafe/design/api) directly and put into other systems such as [SIEMs](https://en.wikipedia.org/wiki/Security_information_and_event_management), searched and filtered through the included JSON viewer, or viewed through the included visualizations of the Packet Café frontend.

The hope and motivation behind the Packet Café platform is to enable lowering the barrier to understanding what is actually in a network traffic capture file \(PCAP\) and provide insight without having to be an expert in networking.

Ready to get started and take Packet Café for a spin already? [Go here.](https://iqtlabs.gitbook.io/packet-cafe/deployment) Otherwise, we recommend reading through the [design section](https://iqtlabs.gitbook.io/packet-cafe/design/) to better understand the bigger picture.

[Packet Café](https://github.com/IQTLabs/packet_cafe) is open source and welcomes contributions to the project.

{% hint style="info" %}
While the focus of the project is around network traffic and specifically processing PCAP files, the platform has been built such that the formats of what it can process are only dependent on the set of analytic processes \(tools\) and what inputs they can handle. The tools could be redefined to ones that handle different inputs while still leveraging the entire pipeline and feedback loop of results.
{% endhint %}

