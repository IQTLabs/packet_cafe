# Packet Café

## Background
Large open domain-specific datasets have proven to achieve new analytical abilities in their respective fields using machine learning. Now is the time to move that needle forward for cybersecurity. To do this, this project has two primary goals:
1.	Build a platform for easy-to-use automated network traffic analysis.
2.	Grow a sizable labeled dataset of network traffic data using that platform to push machine learning forward in the cybersecurity domain.

For more documents related to this project, check out the [wiki](https://va-vsrv-github.a.internal/CyberReboot/packet_cafe/wiki).

## Platform Architecture
<img src="/docs/img/packet_cafe_diagram.png"/>

## Get up and running

Using docker-compose:
```
docker-compose up -d --build --scale web=3 --scale workers=3
```

Using kubernetes (assuming your default orchestrator is set to k8s for stacks):
```
docker stack deploy -c docker-compose.yml packet_cafe
```

## Testing using ApacheBench

** this endpoint is no longer exposed as it is triggered by uploading a file and shouldn't be exposed to end users directly **

```
ab -n 100 -c 10 http://0.0.0.0/v1/start/eyJpbWFnZSI6ImJmaXJzaC9yZXRpY3VsYXRlLXNwbGluZXMiLCAiYmFyIjogImJsYWgifQ==
```

Results should look somoething like the following:
```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 0.0.0.0 (be patient).....done


Server Software:        nginx/1.17.0
Server Hostname:        0.0.0.0
Server Port:            80

Document Path:          /v1/start/eyJpbWFnZSI6ImJmaXJzaC9yZXRpY3VsYXRlLXNwbGluZXMiLCAiYmFyIjogImJsYWgifQ==
Document Length:        36 bytes

Concurrency Level:      10
Time taken for tests:   2.950 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      32400 bytes
HTML transferred:       3600 bytes
Requests per second:    33.89 [#/sec] (mean)
Time per request:       295.034 [ms] (mean)
Time per request:       29.503 [ms] (mean, across all concurrent requests)
Transfer rate:          10.72 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       1
Processing:    52  281 117.8    256     620
Waiting:       52  281 117.8    256     620
Total:         53  281 117.8    257     620

Percentage of the requests served within a certain time (ms)
  50%    257
  66%    338
  75%    359
  80%    382
  90%    440
  95%    526
  98%    547
  99%    620
 100%    620 (longest request)
```
