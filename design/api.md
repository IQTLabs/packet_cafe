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

TODO

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



