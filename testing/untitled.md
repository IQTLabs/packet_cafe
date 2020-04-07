# Curl and Datamash

Assuming you have a PCAP called `test.pcap` and the Packet Café service running, the following will give you performance of making 1000 `POST` requests with that PCAP the the service:

```text
$ time for i in {1..5};do curl -s -w "%{time_total}\n" -o /dev/null -X POST -F 'file=@test.pcap' -L http://0.0.0.0/express-upload; done | datamash max 1 min 1 mean 1 median 1
0.007211	0.001175	0.001631667	0.001535

real	0m7.608s
user	0m2.062s
sys	0m3.450s
```

