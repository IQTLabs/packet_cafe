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

## Testing POST requests with curl and datamash

```
time for i in {1..5};do curl -s -w "%{time_total}\n" -o /dev/null -X POST -F 'file=@merged.pcap' -L http://0.0.0.0/express-upload; done | datamash max 1 min 1 mean 1 median 1
```

## Testing using ApacheBench

```
ab -n 100 -c 10 http://0.0.0.0/api/v1/
```

Results should look something like the following:
```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 0.0.0.0 (be patient).....done


Server Software:        nginx/1.17.0
Server Hostname:        0.0.0.0
Server Port:            80

Document Path:          /api/v1/
Document Length:        0 bytes

Concurrency Level:      10
Time taken for tests:   0.400 seconds
Complete requests:      100
Failed requests:        0
Non-2xx responses:      100
Total transferred:      15500 bytes
HTML transferred:       0 bytes
Requests per second:    250.17 [#/sec] (mean)
Time per request:       39.974 [ms] (mean)
Time per request:       3.997 [ms] (mean, across all concurrent requests)
Transfer rate:          37.87 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       2
Processing:     7   37  20.7     32     107
Waiting:        6   37  20.7     32     107
Total:          7   37  20.8     32     109

Percentage of the requests served within a certain time (ms)
  50%     32
  66%     42
  75%     51
  80%     56
  90%     63
  95%     86
  98%     96
  99%    109
 100%    109 (longest request)
```
