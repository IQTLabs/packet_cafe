# API

The `lb` \(load balancer\) will process requests for both the `ui` \(frontend\) and the `web` \(API\) containers. It is exposed on port 80 by default. Requests that prepend `/api` to the URL will route requests to the `web` container and all other URLs will be routed to the `ui` container.  Additionally, there is an `admin` container that is exposed on its own port \(5001\) and is not load-balanced.

Here are the available API endpoints:

## `admin` \(port 5001\)

{% api-method method="get" host="http://0.0.0.0:5001" path="/v1" %}
{% api-method-summary %}
 /v1
{% endapi-method-summary %}

{% api-method-description %}
Enumerates the API endpoints for this service.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns a list of the available API endpoints for this service.
{% endapi-method-response-example-description %}

```
["/v1", "/v1/id/delete/{session_id}", "/v1/id/files", "/v1/id/results", "/v1/ids", "/v1/info", "/v1/logs/{req_id}"]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0:5001" path="/v1/id/files" %}
{% api-method-summary %}
/v1/id/files
{% endapi-method-summary %}

{% api-method-description %}
Returns all files that been uploaded or created.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns a list of all of the files that have been uploaded/created for this service.
{% endapi-method-response-example-description %}

```
[
    "/files/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/smallFlows.pcap",
    "/files/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/trace_89a08c6a290d4035b75bcd797d21f0ad_2020-04-09_16_21_03.pcap",
    "/files/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/tcprewrite-dot1q-2020-04-09-16_21_06.372570-UTC/trace_89a08c6a290d4035b75bcd797d21f0ad_2020-04-09_16_21_03.pcap"
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0:5001" path="/v1/id/results" %}
{% api-method-summary %}
/v1/id/results
{% endapi-method-summary %}

{% api-method-description %}
Returns all files that been created as an output from tools processing uploaded files.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns a list of all files that have been created as an output from tools processing uploaded files
{% endapi-method-response-example-description %}

```
[
    "/id/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/networkml/metadata.json",
    "/id/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/pcap-stats/metadata.json",
    "/id/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/snort/metadata.json",
    "/id/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/p0f/metadata.json",
    "/id/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/pcapplot/metadata.json",
    "/id/472d843e-d684-41e5-95be-07c63872dc82/89a08c6a290d4035b75bcd797d21f0ad/pcapplot/trace_89a08c6a290d4035b75bcd797d21f0ad_2020-04-09_16_21_03-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-frame-tcp-wsshort-ip-eth-nbss-port-139.pcap/1/map_ASN-trace_89a08c6a290d4035b75bcd797d21f0ad_2020-04-09_16_21_03-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-frame-tcp-wsshort-ip-eth-nbss-port-139.pcap.png"
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0:5001" path="/v1/ids" %}
{% api-method-summary %}
/v1/ids
{% endapi-method-summary %}

{% api-method-description %}
Return all the IDs that have been created
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns a list of all of the IDs that have been created.
{% endapi-method-response-example-description %}

```
[
    "1732c88a-b342-480a-bb62-635bf0e8e33e",
    "cea787c1-f333-49ba-b777-4f14c9d3c65c",
    "472d843e-d684-41e5-95be-07c63872dc82",
    "8fbb85bb-9181-49c8-93ae-a3c8a6bf1688",
    "9f021fe0-5290-4375-a0d5-743ffbcb87ac"
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0:5001" path="/v1/info" %}
{% api-method-summary %}
/v1/info
{% endapi-method-summary %}

{% api-method-description %}
Returns basic information about the service, such as the version
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns JSON of basic information about the service.
{% endapi-method-response-example-description %}

```
{"version": "v0.1.0", "hostname": "ff1a02abc17c"}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0:5001" path="/v1/logs/:id" %}
{% api-method-summary %}
/v1/logs/:id
{% endapi-method-summary %}

{% api-method-description %}
Returns logs of a given ID
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Supply ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
This is a placeholder right now.
{% endapi-method-response-example-description %}

```
TODO
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

## `web` \(port 80\)

{% api-method method="get" host="http://0.0.0.0" path="/api/v1" %}
{% api-method-summary %}
/api/v1
{% endapi-method-summary %}

{% api-method-description %}
Enumerates the API endpoints for this service.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns a list of of the available API endpoints for this service.
{% endapi-method-response-example-description %}

```
[
    "/api/v1",
    "/api/v1/id/{session_id}/{req_id}/{tool}/{pcap}/{counter}/{filename}",
    "/api/v1/ids/{session_id}",
    "/api/v1/info",
    "/api/v1/raw/{tool}/{counter}/{session_id}/{req_id}",
    "/api/v1/results/{tool}/{counter}/{session_id}/{req_id}",
    "/api/v1/status/{session_id}/{req_id}",
    "/api/v1/stop/{session_id}/{req_id}",
    "/api/v1/tools",
    "/api/v1/upload"
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/delete/:sess\_id" %}
{% api-method-summary %}
/api/v1/delete/:sess\_id
{% endapi-method-summary %}

{% api-method-description %}
Deletes files and id directories associated with a session.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="sess\_id" type="string" required=true %}
Session ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{ "status": "Success" }
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/id/:sess\_id/:req\_id/:tool/:pcap/:counter/:filename" %}
{% api-method-summary %}
/api/v1/id/:sess\_id/:req\_id/:tool/:pcap/:counter/:filename
{% endapi-method-summary %}

{% api-method-description %}
Serves up the results from a file produced by a tool given a specific PCAP uploaded for rendering.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="filename" type="string" required=true %}
Filename to serve up that is returning results from the tool.
{% endapi-method-parameter %}

{% api-method-parameter name="counter" type="number" required=true %}
Which result file number to get, if only one use 1
{% endapi-method-parameter %}

{% api-method-parameter name="pcap" type="string" required=true %}
The name of the PCAP file
{% endapi-method-parameter %}

{% api-method-parameter name="tool" type="string" required=true %}
The tool to get results from
{% endapi-method-parameter %}

{% api-method-parameter name="req\_id" type="string" required=true %}
The ID of the file request
{% endapi-method-parameter %}

{% api-method-parameter name="sess\_id" type="string" required=true %}
The ID of the session
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns the contents of the results file, could be text or images or whatever.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/ids/:sess\_id" %}
{% api-method-summary %}
/api/v1/ids/:sess\_id
{% endapi-method-summary %}

{% api-method-description %}
Returns a list of all IDs and info about them for this session ID.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="sess\_id" type="string" required=true %}
Session ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns a list of all IDs and info about them for a given session ID.
{% endapi-method-response-example-description %}

```
[{"id": "ab7af73526814d58bf35f1399a5594b2", "filename": "trace_ab7af73526814d58bf35f1399a5594b2_2020-04-09_23_38_56.pcap", "tools": ["networkml", "mercury", "pcap-stats", "snort", "p0f", "pcapplot"], "original_filename": "smallFlows.pcap"}]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/info" %}
{% api-method-summary %}
/api/v1/info
{% endapi-method-summary %}

{% api-method-description %}
Returns basic information about the service, such as version.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns basic information about the service, such as version.
{% endapi-method-response-example-description %}

```
{
    "version": "v0.1.0",
    "hostname": "0425707763d8"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/raw/:tool/:counter/:sess\_id/:req\_id" %}
{% api-method-summary %}
/api/v1/raw/:tool/:counter/:sess\_id/:req\_id
{% endapi-method-summary %}

{% api-method-description %}
Returns the raw JSON results from a tool.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="req\_id" type="string" required=true %}
The ID of the file request.
{% endapi-method-parameter %}

{% api-method-parameter name="sess\_id" type="string" required=true %}
Session ID
{% endapi-method-parameter %}

{% api-method-parameter name="counter" type="number" required=true %}
A tool might have more than 1 result, otherwise use 0.
{% endapi-method-parameter %}

{% api-method-parameter name="tool" type="string" required=true %}
Name of the tool to get results for.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
This is an example output of the tool p0f.
{% endapi-method-response-example-description %}

```
[
    {},
    {},
    {},
    {},
    {
        "10.0.2.15": {
            "full_os": "Windows NT kernel",
            "short_os": "Windows",
            "link": "Ethernet or modem",
            "raw_mtu": "1500",
            "mac": "08:00:27:cc:3f:1b"
        }
    }
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/results/:tool/:counter/:sess\_id/:req\_id" %}
{% api-method-summary %}
/api/v1/results/:tool/:counter/:sess\_id/:req\_id
{% endapi-method-summary %}

{% api-method-description %}
Returns the results from a tool for rendering.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="req\_id" type="string" required=true %}
The ID of the file request.
{% endapi-method-parameter %}

{% api-method-parameter name="sess\_id" type="string" required=true %}
Session ID
{% endapi-method-parameter %}

{% api-method-parameter name="counter" type="number" required=true %}
A tool might have more than 1 results, otherwise use 0.
{% endapi-method-parameter %}

{% api-method-parameter name="tool" type="string" required=true %}
Name of the tool to get results for.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
This will render actual html and/or imagery.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/status/:sess\_id/:req\_id" %}
{% api-method-summary %}
/api/v1/status/:sess\_id/:req\_id
{% endapi-method-summary %}

{% api-method-description %}
Return the status of all tools for a request ID.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="req\_id" type="string" required=true %}
The ID of the file request.
{% endapi-method-parameter %}

{% api-method-parameter name="sess\_id" type="string" required=true %}
Session ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns the status of all tools for a request ID.
{% endapi-method-response-example-description %}

```
{
	"cleaned": true,
	"mercury": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:07:51.507362+00:00"
	},
	"pcap-stats": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:07:43.972380+00:00"
	},
	"pcapplot": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:10:54.366903+00:00"
	},
	"networkml": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:09:17.470786+00:00"
	},
	"p0f": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:09:26.266748+00:00"
	},
	"pcap-dot1q": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:07:43.362974+00:00"
	},
	"snort": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:07:54.466032+00:00"
	},
	"ncapture": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:07:38.438424+00:00"
	},
	"pcap-splitter": {
		"state": "Complete",
		"timestamp": "2020-04-24T19:08:47.088579+00:00"
	}
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/stop/:sess\_id/:req\_id" %}
{% api-method-summary %}
/api/v1/stop/:sess\_id/:req\_id
{% endapi-method-summary %}

{% api-method-description %}
Stops jobs of a request ID.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="req\_id" type="string" required=true %}
The ID of the file request.
{% endapi-method-parameter %}

{% api-method-parameter name="sess\_id" type="string" required=true %}
Session ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
TO BE IMPLEMENTED
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://0.0.0.0" path="/api/v1/tools" %}
{% api-method-summary %}
/api/v1/tools
{% endapi-method-summary %}

{% api-method-description %}
Returns list of available tools
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns the list of available tools.
{% endapi-method-response-example-description %}

```
{
    "workers": [
        {
            "name": "pcapplot",
            "image": "iqtlabs/pcapplot",
            "version": "v0.1.5",
            "labels": "",
            "stage": "analysis",
            "viewableOutput": true,
            "outputs": [
                "file"
            ],
            "inputs": [
                "pcap-splitter"
            ]
        },
        {
            "name": "pcap-splitter",
            "image": "iqtlabs/pcap-to-node-pcap",
            "version": "v0.11.7",
            "labels": "",
            "stage": "preprocessing",
            "viewableOutput": false,
            "environment": {
                "rabbit": "true"
            },
            "outputs": [
                "pcap"
            ],
            "inputs": [
                "pcap-dot1q"
            ]
        },
        {
            "name": "ncapture",
            "image": "iqtlabs/ncapture",
            "version": "v0.11.7",
            "labels": "",
            "stage": "preprocessing",
            "viewableOutput": false,
            "command": [
                "/tmp/run.sh",
                "pcapfile:",
                "60",
                "id",
                "1",
                "ip"
            ],
            "environment": {
                "rabbit": "true"
            },
            "outputs": [
                "pcap"
            ],
            "inputs": [
                "pcap",
                "pcapng"
            ]
        },
        {
            "name": "pcap-dot1q",
            "image": "iqtlabs/tcprewrite-dot1q",
            "version": "v0.11.7",
            "labels": "",
            "stage": "preprocessing",
            "viewableOutput": false,
            "environment": {
                "rabbit": "true"
            },
            "outputs": [
                "pcap"
            ],
            "inputs": [
                "ncapture"
            ]
        },
        {
            "name": "networkml",
            "image": "iqtlabs/networkml",
            "version": "v0.4.8",
            "labels": "",
            "stage": "analysis",
            "viewableOutput": true,
            "command": [
                "-p"
            ],
            "environment": {
                "POSEIDON_PUBLIC_SESSIONS": "1",
                "RABBIT": "True",
                "RABBIT_HOST": "messenger",
                "RABBIT_EXCHANGE": "",
                "RABBIT_ROUTING_KEY": "task_queue",
                "RABBIT_QUEUE": "True",
                "RABBIT_QUEUE_NAME": "task_queue",
                "REDIS": "False"
            },
            "contentType": "application/json",
            "outputs": [
                "rabbitmq"
            ],
            "inputs": [
                "pcap-splitter"
            ]
        },
        {
            "name": "snort",
            "image": "iqtlabs/snort",
            "version": "v0.11.7",
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
        },
        {
            "name": "pcap-stats",
            "image": "iqtlabs/pcap-stats",
            "version": "v0.11.7",
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
        },
        {
            "name": "mercury",
            "image": "iqtlabs/mercury",
            "version": "v0.11.7",
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
        },
        {
            "name": "p0f",
            "image": "iqtlabs/p0f",
            "version": "v0.11.7",
            "labels": "",
            "stage": "analysis",
            "viewableOutput": true,
            "contentType": "application/json",
            "outputs": [
                "rabbitmq"
            ],
            "inputs": [
                "pcap-splitter"
            ]
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://0.0.0.0" path="/api/v1/upload" %}
{% api-method-summary %}
/api/v1/upload
{% endapi-method-summary %}

{% api-method-description %}
Upload a PCAP file.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-form-data-parameters %}
{% api-method-parameter name="file" type="object" required=true %}
The file to upload
{% endapi-method-parameter %}

{% api-method-parameter name="sessionId" type="string" required=true %}
Session ID
{% endapi-method-parameter %}
{% endapi-method-form-data-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Upload a PCAP file.
{% endapi-method-response-example-description %}

```
{'filename': filename, 'uuid': uid, 'status': 'Success'}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

## `ui` \(port 80\)

{% api-method method="get" host="http://0.0.0.0" path="/" %}
{% api-method-summary %}
/
{% endapi-method-summary %}

{% api-method-description %}
Retrieves the main home page.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Retrieves the main home page.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://0.0.0.0" path="/express-upload" %}
{% api-method-summary %}
/express-upload
{% endapi-method-summary %}

{% api-method-description %}
Processing uploading a file and passes it on the API.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="file" type="object" required=false %}
File to upload.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



