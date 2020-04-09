# API

The `lb` \(load balancer\) will process requests for both the `ui` \(frontend\) and the `web` \(API\) containers. It is exposed on port 80 by default. Requests that prepend `/api` to the URL will route requests to the `web` container and all other URLs will be routed to the `ui` container.  Additionally, there is an `admin` container that is exposed on its own port \(5001\) and is not load balanced.

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
["/v1", "/v1/id/files", "/v1/id/results", "/v1/ids", "/v1/info", "/v1/logs/{req_id}"]
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

{% api-method method="get" host="" path="" %}
{% api-method-summary %}

{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="" type="string" required=false %}

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

TODO

## `ui` \(port 80\)

{% api-method method="get" host="" path="" %}
{% api-method-summary %}

{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="" type="string" required=false %}

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

TODO



