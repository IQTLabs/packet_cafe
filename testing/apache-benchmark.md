# Apache Benchmark

If you have Apache Benchmark \(`ab`\) installed, you can run to see performance of making `GET` requests to the API endpoints:

```text
ab -n 100 -c 10 http://0.0.0.0/api/v1/
```

Results should look something like the following:

```text
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

