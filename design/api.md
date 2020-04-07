# API

The `lb` \(load balancer\) will process requests for both the `ui` \(frontend\) and the `web` \(API\) containers. It is exposed on port 80 by default. Requests that prepend `/api` to the URL will route requests to the `web` container and all other URLs will be routed to the `ui` container.  Additionally, there is an `admin` container that is exposed on its own port \(5001\) and is not load balanced.

Here are the available API endpoints:

`admin` \(port 5001\):

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

TODO

