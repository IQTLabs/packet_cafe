# Storage

All of the results of each tool is stored on the filesystem. If a worker output isn't a new file such as a modified PCAP or an image, but is instead metadata, this gets stored in a `JSON` file.

By default, the files and results are stored in 4 directories:

```text
/definitions
/files
/id
/redis
```

{% hint style="info" %}
The default location of those 4 directories can be overridden with an environment variable `VOL_PREFIX`
{% endhint %}

With all of the default tools enabled, here's an example of what Packet Café will do. First download `smallFlows.pcap` \([https://tcpreplay.appneta.com/wiki/captures.html](https://tcpreplay.appneta.com/wiki/captures.html)\) and then upload it through the home page of the Packet Café service \([http://0.0.0.0/](http://0.0.0.0/)\) and once all of the workers have finished it will result in the following file outputs and storage structure \(see: [Getting Started](https://cyberreboot.gitbook.io/packet-cafe/getting-started)\):

```text
├── definitions
│   └── workers.json
├── files
│   └── 94517255-1c72-4481-a23f-3d996f3f2b28
│       └── a8e70a4fec2949e39acd78018326b021
│           ├── smallFlows.pcap
│           ├── tcprewrite-dot1q-2020-04-03-18_16_13.243712-UTC
│           │   ├── pcap-node-splitter-2020-04-03-18_16_14.978672-UTC
│           │   │   ├── clients
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-tcp-frame-eth-nbss-wsshort-ip-port-139.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-10-0-2-2-10-0-2-15-10-0-2-2-icmp-frame-eth-ip.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-110-67-111-103-110-67-111-103-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-111-250-201-8-111-250-201-8-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-114-46-199-16-114-46-199-16-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-125-232-97-116-125-232-97-116-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-130-206-167-238-130-206-167-238-172-16-255-1-wsshort-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-145-120-22-109-145-120-22-109-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-172-16-255-1-172-16-255-1-204-9-163-158-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-173-178-118-29-172-16-255-1-173-178-118-29-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-182-166-37-160-172-16-255-1-182-166-37-160-wsshort-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-190-213-76-21-172-16-255-1-190-213-76-21-wsshort-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-192-168-3-131-192-168-3-131-72-14-213-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-253-10-0-2-15-207-46-125-253-data-udp-frame-eth-ip-port-2531.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-254-10-0-2-15-207-46-125-254-data-udp-frame-eth-ip-port-2532.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-47-250-146-172-16-255-1-207-47-250-146-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-209-105-148-72-172-16-255-1-209-105-148-72-wsshort-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-50-66-122-172-16-255-1-212-50-66-122-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-8-163-80-172-16-255-1-212-8-163-80-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-65-55-25-60-10-0-2-15-65-55-25-60-tcp-wsshort-frame-eth-ip-port-2498.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-66-209-190-84-172-16-255-1-66-209-190-84-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-67-117-28-180-172-16-255-1-67-117-28-180-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-67-64-157-145-172-16-255-1-67-64-157-145-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-70-67-177-253-172-16-255-1-70-67-177-253-rtcp-frame-eth-wsshort-udp-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-70-80-140-19-172-16-255-1-70-80-140-19-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-98-243-160-202-172-16-255-1-98-243-160-202-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   │   └── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-miscellaneous-172-16-255-1-67-215-65-132-icmp-frame-eth-ip.pcap
│           │   │   └── servers
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-miscellaneous-172-16-255-1-67-215-65-132-icmp-frame-eth-ip.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-10-0-2-15-10-0-2-15-207-46-125-253-data-udp-frame-eth-ip-port-2531.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-10-0-2-2-10-0-2-15-10-0-2-2-udp-frame-eth-ip-port-1900.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-10-0-2-255-10-0-2-15-10-0-2-255-frame-eth-nbdgm-wsshort-udp-ip-port-138.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-10-0-2-3-10-0-2-15-10-0-2-3-dns-frame-eth-wsshort-udp-ip-port-53.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-10-1-1-2-10-1-1-2-172-16-255-1-wsshort-udp-frame-eth-ip-port-50023.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-109-173-29-34-109-173-29-34-172-16-255-1-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-109-227-83-14-109-227-83-14-172-16-255-1-data-udp-frame-eth-ip-port-6536.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-109-227-83-224-109-227-83-224-172-16-255-1-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-109-229-25-126-109-229-25-126-172-16-255-1-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-109-255-178-86-109-255-178-86-172-16-255-1-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-109-90-123-126-109-90-123-126-172-16-255-1-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-111-249-130-107-111-249-130-107-172-16-255-1-data-udp-frame-eth-ip-port-42403.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-114-33-52-13-114-33-52-13-172-16-255-1-data-udp-frame-eth-ip-port-38843.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-114-46-144-25-114-46-144-25-172-16-255-1-data-udp-frame-eth-ip-port-29080.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-118-6-206-252-118-6-206-252-172-16-255-1-data-udp-frame-eth-ip-port-48570.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-12-129-210-71-12-129-210-71-192-168-3-131-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-124-144-10-123-124-144-10-123-172-16-255-1-wsshort-udp-frame-eth-ip-port-50583.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-128-173-201-171-128-173-201-171-172-16-255-1-data-udp-frame-eth-ip-port-23537.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-128-241-90-211-128-241-90-211-172-16-255-1-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-129-132-232-116-129-132-232-116-172-16-255-1-data-udp-frame-eth-ip-port-7704.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-130-117-72-100-130-117-72-100-172-16-255-1-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-134-2-48-153-134-2-48-153-172-16-255-1-data-udp-frame-eth-ip-port-8984.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-145-94-52-184-145-94-52-184-172-16-255-1-data-udp-frame-eth-ip-port-11610.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-147-31-122-1-147-31-122-1-172-16-255-1-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-148-88-200-63-148-88-200-63-172-16-255-1-wsshort-udp-frame-eth-ip-port-42843.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-156-26-54-15-156-26-54-15-172-16-255-1-data-udp-frame-eth-ip-port-4300.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-172-16-0-1-172-16-0-1-172-16-255-1-frame-eth-wsshort-udp-bootp-ip-port-67.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-172-16-255-1-172-16-255-1-67-117-28-180-data-udp-frame-eth-ip-port-50983.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-172-16-255-255-172-16-255-1-172-16-255-255-nbns-frame-eth-wsshort-udp-ip-port-137.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-174-36-30-111-174-36-30-111-192-168-3-131-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-174-48-244-28-172-16-255-1-174-48-244-28-data-udp-frame-eth-ip-port-31727.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-178-144-253-171-172-16-255-1-178-144-253-171-data-udp-frame-eth-ip-port-43217.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-178-25-111-25-172-16-255-1-178-25-111-25-wsshort-udp-frame-eth-ip-port-33453.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-184-24-133-32-184-24-133-32-192-168-3-131-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-184-24-143-139-184-24-143-139-192-168-3-131-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-184-85-226-161-172-16-255-1-184-85-226-161-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-186-80-218-34-172-16-255-1-186-80-218-34-data-udp-frame-eth-ip-port-3290.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-188-163-1-229-172-16-255-1-188-163-1-229-data-udp-frame-eth-ip-port-50709.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-188-17-181-29-172-16-255-1-188-17-181-29-data-udp-frame-eth-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-188-2-252-64-172-16-255-1-188-2-252-64-data-udp-frame-eth-ip-port-43699.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-188-22-186-229-172-16-255-1-188-22-186-229-data-udp-frame-eth-ip-port-14487.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-188-231-175-85-172-16-255-1-188-231-175-85-data-udp-frame-eth-ip-port-21827.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-188-246-82-7-172-16-255-1-188-246-82-7-data-udp-frame-eth-ip-port-32291.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-189-126-44-128-172-16-255-1-189-126-44-128-data-udp-frame-eth-ip-port-3192.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-190-164-247-173-172-16-255-1-190-164-247-173-data-udp-frame-eth-ip-port-29044.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-190-213-192-39-172-16-255-1-190-213-192-39-data-udp-frame-eth-ip-port-9009.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-190-39-220-172-172-16-255-1-190-39-220-172-data-udp-frame-eth-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-192-168-3-1-192-168-3-1-192-168-3-131-dns-frame-eth-wsshort-udp-ip-port-53.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-192-168-3-255-192-168-3-131-192-168-3-255-db-lsp-disc-udp-frame-eth-ip-port-17500.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-192-168-3-90-10-0-2-15-192-168-3-90-tcp-frame-eth-nbss-wsshort-ip-port-139.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-192-168-3-99-192-168-3-131-192-168-3-99-wsshort-udp-frame-eth-ip-port-161.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-194-165-188-76-172-16-255-1-194-165-188-76-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-194-165-188-79-172-16-255-1-194-165-188-79-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-194-171-12-150-172-16-255-1-194-171-12-150-data-udp-frame-eth-ip-port-44386.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-194-192-199-252-172-16-255-1-194-192-199-252-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-195-27-155-11-192-168-3-131-195-27-155-11-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-195-27-155-40-192-168-3-131-195-27-155-40-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-198-104-200-146-10-0-2-15-198-104-200-146-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-2-120-66-172-172-16-255-1-2-120-66-172-data-udp-frame-eth-ip-port-23852.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-14-234-101-192-168-3-131-204-14-234-101-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-14-234-85-192-168-3-131-204-14-234-85-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-194-237-136-172-16-255-1-204-194-237-136-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-9-163-158-172-16-255-1-204-9-163-158-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-9-163-160-172-16-255-1-204-9-163-160-wsshort-udp-frame-eth-ip-port-35777.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-9-163-166-192-168-3-131-204-9-163-166-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-9-163-181-172-16-255-1-204-9-163-181-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-204-9-163-184-172-16-255-1-204-9-163-184-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-206-108-207-138-192-168-3-131-206-108-207-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-206-108-207-139-192-168-3-131-206-108-207-139-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-206-108-207-145-192-168-3-131-206-108-207-145-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-206-108-207-155-192-168-3-131-206-108-207-155-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-206-108-207-163-192-168-3-131-206-108-207-163-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-207-172-53-166-172-16-255-1-207-172-53-166-data-udp-frame-eth-ip-port-42304.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-207-46-0-109-192-168-3-131-207-46-0-109-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-207-46-105-186-10-0-2-15-207-46-105-186-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-207-46-113-78-10-0-2-15-207-46-113-78-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-207-46-148-38-192-168-3-131-207-46-148-38-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-207-46-216-54-192-168-3-131-207-46-216-54-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-207-46-96-145-10-0-2-15-207-46-96-145-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-50-77-134-192-168-3-131-208-50-77-134-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-50-77-136-192-168-3-131-208-50-77-136-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-50-77-73-192-168-3-131-208-50-77-73-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-50-77-97-192-168-3-131-208-50-77-97-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-82-236-129-192-168-3-131-208-82-236-129-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-82-236-130-192-168-3-131-208-82-236-130-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-82-238-129-192-168-3-131-208-82-238-129-tcp-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-88-186-242-172-16-255-1-208-88-186-242-data-udp-frame-eth-ip-port-13392.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-208-88-186-244-172-16-255-1-208-88-186-244-data-udp-frame-eth-ip-port-13392.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-209-17-73-30-192-168-3-131-209-17-73-30-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-212-8-163-80-172-16-255-1-212-8-163-80-tcp-frame-eth-ip-port-10672.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-212-8-166-36-172-16-255-1-212-8-166-36-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-213-146-189-205-172-16-255-1-213-146-189-205-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-213-166-51-4-172-16-255-1-213-166-51-4-tcp-frame-eth-ip-port-10624.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-213-19-120-150-172-16-255-1-213-19-120-150-data-udp-frame-eth-ip-port-16763.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-213-64-95-196-172-16-255-1-213-64-95-196-data-udp-frame-eth-ip-port-7892.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-217-174-56-245-172-16-255-1-217-174-56-245-wsshort-udp-frame-eth-ip-port-8395.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-218-166-122-86-172-16-255-1-218-166-122-86-wsshort-udp-frame-eth-ip-port-22511.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-218-173-246-133-172-16-255-1-218-173-246-133-data-udp-frame-eth-ip-port-21363.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-224-0-0-252-192-168-3-131-224-0-0-252-frame-eth-ip-wsshort-udp-llmnr-port-5355.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-239-255-255-250-192-168-3-131-239-255-255-250-udp-frame-eth-ip-port-1900.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-24-192-137-36-172-16-255-1-24-192-137-36-data-udp-frame-eth-ip-port-45156.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-24-193-140-50-172-16-255-1-24-193-140-50-data-udp-frame-eth-ip-port-9911.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-24-54-5-14-172-16-255-1-24-54-5-14-wsshort-udp-frame-eth-ip-port-23389.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-24-78-140-118-172-16-255-1-24-78-140-118-data-udp-frame-eth-ip-port-24884.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-255-255-255-255-192-168-3-131-255-255-255-255-wsshort-udp-frame-eth-ip-port-67.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-63-215-202-48-192-168-3-131-63-215-202-48-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-63-215-202-49-192-168-3-131-63-215-202-49-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-64-4-35-57-10-0-2-15-2-4-5-4-1-1-4-2-64-4-35-57-tcp-frame-eth-ip-port-1863.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-64-4-9-254-10-0-2-15-2-4-5-4-1-1-4-2-64-4-9-254-tcp-frame-eth-ip-port-1863.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-35-35-4-172-16-255-1-65-35-35-4-wsshort-udp-frame-eth-ip-port-34467.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-167-27-10-0-2-15-65-54-167-27-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-186-19-10-0-2-15-65-54-186-19-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-189-173-10-0-2-15-2-4-5-4-1-1-4-2-65-54-189-173-tcp-frame-eth-ip-port-1863.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-140-192-168-3-131-65-54-95-140-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-142-192-168-3-131-65-54-95-142-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-149-192-168-3-131-65-54-95-149-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-216-192-168-3-131-65-54-95-216-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-39-192-168-3-131-65-54-95-39-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-66-192-168-3-131-65-54-95-66-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-68-192-168-3-131-65-54-95-68-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-54-95-75-192-168-3-131-65-54-95-75-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-116-184-10-0-2-15-65-55-116-184-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-118-107-192-168-3-131-65-55-118-107-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-15-244-10-0-2-15-65-55-15-244-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-17-37-192-168-3-131-65-55-17-37-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-206-199-192-168-3-131-65-55-206-199-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-206-209-192-168-3-131-65-55-206-209-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-206-9-192-168-3-131-65-55-206-9-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-239-163-192-168-3-131-65-55-239-163-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-25-60-10-0-2-15-65-55-25-60-tcp-wsshort-frame-eth-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-5-231-192-168-3-131-65-55-5-231-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-5-232-192-168-3-131-65-55-5-232-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-65-55-57-251-192-168-3-131-65-55-57-251-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-66-209-190-84-172-16-255-1-66-209-190-84-data-udp-frame-eth-ip-port-4813.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-66-220-149-32-192-168-3-131-66-220-149-32-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-66-235-133-62-192-168-3-131-66-235-133-62-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-66-235-136-89-192-168-3-131-66-235-136-89-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-66-235-139-121-192-168-3-131-66-235-139-121-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-66-235-143-184-172-16-255-1-66-235-143-184-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-67-163-123-10-172-16-255-1-67-163-123-10-data-udp-frame-eth-ip-port-39466.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-67-170-187-174-172-16-255-1-67-170-187-174-data-udp-frame-eth-ip-port-38922.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-67-215-65-132-172-16-255-1-67-215-65-132-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-67-82-196-121-172-16-255-1-67-82-196-121-data-udp-frame-eth-ip-port-10662.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-67-84-192-140-172-16-255-1-67-84-192-140-data-udp-frame-eth-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-67-84-50-244-172-16-255-1-67-84-50-244-data-udp-frame-eth-ip-port-37499.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-67-9-27-118-172-16-255-1-67-9-27-118-data-udp-frame-eth-ip-port-48240.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-69-126-180-28-172-16-255-1-69-126-180-28-data-udp-frame-eth-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-69-255-24-214-172-16-255-1-69-255-24-214-data-udp-frame-eth-ip-port-24506.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-69-63-181-15-192-168-3-131-69-63-181-15-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-70-37-129-32-10-0-2-15-70-37-129-32-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-70-37-129-34-10-0-2-15-70-37-129-34-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-71-10-26-41-172-16-255-1-71-10-26-41-data-udp-frame-eth-ip-port-14168.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-71-224-25-112-172-16-255-1-71-224-25-112-data-udp-frame-eth-ip-port-33695.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-71-67-129-20-172-16-255-1-71-67-129-20-wsshort-udp-frame-eth-ip-port-21319.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-71-67-132-22-172-16-255-1-71-67-132-22-wsshort-udp-frame-eth-ip-port-28376.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-203-102-192-168-3-131-72-14-203-102-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-101-192-168-3-131-72-14-213-101-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-102-192-168-3-131-72-14-213-102-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-103-192-168-3-131-72-14-213-103-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-105-192-168-3-131-72-14-213-105-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-120-192-168-3-131-72-14-213-120-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-132-192-168-3-131-72-14-213-132-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-138-192-168-3-131-72-14-213-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-147-192-168-3-131-72-14-213-147-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-148-192-168-3-131-72-14-213-148-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-149-192-168-3-131-72-14-213-149-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-156-192-168-3-131-72-14-213-156-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-167-192-168-3-131-72-14-213-167-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-72-14-213-18-192-168-3-131-72-14-213-18-tcp-frame-eth-wsshort-ssl-ip-port-443.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-74-125-127-148-192-168-3-131-74-125-127-148-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-74-217-50-10-192-168-3-131-74-217-50-10-tcp-wsshort-frame-eth-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-74-75-251-207-172-16-255-1-74-75-251-207-data-udp-frame-eth-ip-port-39109.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-75-76-39-18-172-16-255-1-75-76-39-18-data-udp-frame-eth-ip-port-35877.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-76-167-181-32-172-16-255-1-76-167-181-32-data-udp-frame-eth-ip-port-10848.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-76-74-140-168-192-168-3-131-76-74-140-168-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-79-143-161-140-172-16-255-1-79-143-161-140-wsshort-udp-frame-eth-ip-port-32575.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-80-221-22-161-172-16-255-1-80-221-22-161-data-udp-frame-eth-ip-port-30425.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-82-226-125-157-172-16-255-1-82-226-125-157-data-udp-frame-eth-ip-port-45834.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-82-58-187-140-172-16-255-1-82-58-187-140-data-udp-frame-eth-ip-port-43187.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-84-197-9-59-172-16-255-1-84-197-9-59-data-udp-frame-eth-ip-port-44808.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-85-65-191-56-172-16-255-1-85-65-191-56-data-udp-frame-eth-ip-port-29464.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-87-121-79-141-172-16-255-1-87-121-79-141-data-udp-frame-eth-ip-port-29347.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-87-5-175-49-172-16-255-1-87-5-175-49-data-udp-frame-eth-ip-port-42341.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-87-64-66-227-172-16-255-1-87-64-66-227-wsshort-udp-frame-eth-ip-port-31783.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-88-198-13-111-172-16-255-1-88-198-13-111-wsshort-udp-frame-eth-ip-port-21368.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-88-203-161-148-172-16-255-1-88-203-161-148-data-udp-frame-eth-ip-port-13899.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-89-34-75-134-172-16-255-1-89-34-75-134-wsshort-udp-frame-eth-ip-port-23924.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-91-103-140-2-10-0-2-15-91-103-140-2-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-92-224-118-42-172-16-255-1-92-224-118-42-data-udp-frame-eth-ip-port-50289.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-92-247-222-20-172-16-255-1-92-247-222-20-wsshort-udp-frame-eth-ip-port-25987.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-92-255-161-104-172-16-255-1-92-255-161-104-wsshort-udp-frame-eth-ip-port-43708.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-93-181-202-185-172-16-255-1-93-181-202-185-data-udp-frame-eth-ip-port-30757.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-94-248-101-181-172-16-255-1-94-248-101-181-data-udp-frame-eth-ip-port-38685.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-94-41-86-170-172-16-255-1-94-41-86-170-data-udp-frame-eth-ip-port-9113.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-95-139-1-252-172-16-255-1-95-139-1-252-data-udp-frame-eth-ip-port-13208.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-95-160-236-51-172-16-255-1-95-160-236-51-data-udp-frame-eth-ip-port-32683.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-95-68-58-110-172-16-255-1-95-68-58-110-wsshort-udp-frame-eth-ip-port-17865.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-95-86-252-198-172-16-255-1-95-86-252-198-data-udp-frame-eth-ip-port-6192.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-96-17-8-49-10-0-2-15-96-17-8-49-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │       ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-97-103-179-155-172-16-255-1-97-103-179-155-wsshort-udp-frame-eth-ip-port-2151.pcap
│           │   │       └── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-server-ip-99-96-126-9-172-16-255-1-99-96-126-9-data-udp-frame-eth-ip-port-32178.pcap
│           │   └── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10.pcap
│           └── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10.pcap
├── id
│   └── 94517255-1c72-4481-a23f-3d996f3f2b28
│       └── a8e70a4fec2949e39acd78018326b021
│           ├── mercury
│           │   └── metadata.json
│           ├── networkml
│           │   └── metadata.json
│           ├── p0f
│           │   └── metadata.json
│           ├── pcap-stats
│           │   └── metadata.json
│           ├── pcapplot
│           │   ├── metadata.json
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-tcp-frame-eth-nbss-wsshort-ip-port-139.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-tcp-frame-eth-nbss-wsshort-ip-port-139.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-tcp-frame-eth-nbss-wsshort-ip-port-139.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-tcp-frame-eth-nbss-wsshort-ip-port-139.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-10-0-2-15-10-0-2-15-192-168-3-90-tcp-frame-eth-nbss-wsshort-ip-port-139.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-110-67-111-103-110-67-111-103-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-110-67-111-103-110-67-111-103-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-110-67-111-103-110-67-111-103-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-110-67-111-103-110-67-111-103-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-110-67-111-103-110-67-111-103-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-111-250-201-8-111-250-201-8-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-111-250-201-8-111-250-201-8-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-111-250-201-8-111-250-201-8-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-111-250-201-8-111-250-201-8-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-111-250-201-8-111-250-201-8-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-114-46-199-16-114-46-199-16-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-114-46-199-16-114-46-199-16-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-114-46-199-16-114-46-199-16-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-114-46-199-16-114-46-199-16-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-114-46-199-16-114-46-199-16-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-125-232-97-116-125-232-97-116-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-125-232-97-116-125-232-97-116-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-125-232-97-116-125-232-97-116-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-125-232-97-116-125-232-97-116-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-125-232-97-116-125-232-97-116-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-145-120-22-109-145-120-22-109-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-145-120-22-109-145-120-22-109-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-145-120-22-109-145-120-22-109-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-145-120-22-109-145-120-22-109-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-145-120-22-109-145-120-22-109-172-16-255-1-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-172-16-255-1-172-16-255-1-204-9-163-158-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-172-16-255-1-172-16-255-1-204-9-163-158-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-172-16-255-1-172-16-255-1-204-9-163-158-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-172-16-255-1-172-16-255-1-204-9-163-158-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-172-16-255-1-172-16-255-1-204-9-163-158-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-173-178-118-29-172-16-255-1-173-178-118-29-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-173-178-118-29-172-16-255-1-173-178-118-29-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-173-178-118-29-172-16-255-1-173-178-118-29-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-173-178-118-29-172-16-255-1-173-178-118-29-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-173-178-118-29-172-16-255-1-173-178-118-29-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-182-166-37-160-172-16-255-1-182-166-37-160-wsshort-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-182-166-37-160-172-16-255-1-182-166-37-160-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-182-166-37-160-172-16-255-1-182-166-37-160-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-182-166-37-160-172-16-255-1-182-166-37-160-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-182-166-37-160-172-16-255-1-182-166-37-160-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-190-213-76-21-172-16-255-1-190-213-76-21-wsshort-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-190-213-76-21-172-16-255-1-190-213-76-21-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-190-213-76-21-172-16-255-1-190-213-76-21-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-190-213-76-21-172-16-255-1-190-213-76-21-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-190-213-76-21-172-16-255-1-190-213-76-21-wsshort-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-192-168-3-131-192-168-3-131-72-14-213-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-192-168-3-131-192-168-3-131-72-14-213-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-192-168-3-131-192-168-3-131-72-14-213-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-192-168-3-131-192-168-3-131-72-14-213-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-192-168-3-131-192-168-3-131-72-14-213-138-http-tcp-frame-eth-wsshort-ip-port-80.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-253-10-0-2-15-207-46-125-253-data-udp-frame-eth-ip-port-2531.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-253-10-0-2-15-207-46-125-253-data-udp-frame-eth-ip-port-2531.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-253-10-0-2-15-207-46-125-253-data-udp-frame-eth-ip-port-2531.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-253-10-0-2-15-207-46-125-253-data-udp-frame-eth-ip-port-2531.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-253-10-0-2-15-207-46-125-253-data-udp-frame-eth-ip-port-2531.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-254-10-0-2-15-207-46-125-254-data-udp-frame-eth-ip-port-2532.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-254-10-0-2-15-207-46-125-254-data-udp-frame-eth-ip-port-2532.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-254-10-0-2-15-207-46-125-254-data-udp-frame-eth-ip-port-2532.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-254-10-0-2-15-207-46-125-254-data-udp-frame-eth-ip-port-2532.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-46-125-254-10-0-2-15-207-46-125-254-data-udp-frame-eth-ip-port-2532.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-47-250-146-172-16-255-1-207-47-250-146-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-47-250-146-172-16-255-1-207-47-250-146-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-47-250-146-172-16-255-1-207-47-250-146-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-47-250-146-172-16-255-1-207-47-250-146-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-207-47-250-146-172-16-255-1-207-47-250-146-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-50-66-122-172-16-255-1-212-50-66-122-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-50-66-122-172-16-255-1-212-50-66-122-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-50-66-122-172-16-255-1-212-50-66-122-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-50-66-122-172-16-255-1-212-50-66-122-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-50-66-122-172-16-255-1-212-50-66-122-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-8-163-80-172-16-255-1-212-8-163-80-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-8-163-80-172-16-255-1-212-8-163-80-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-8-163-80-172-16-255-1-212-8-163-80-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-8-163-80-172-16-255-1-212-8-163-80-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-212-8-163-80-172-16-255-1-212-8-163-80-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-67-117-28-180-172-16-255-1-67-117-28-180-data-udp-frame-eth-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-67-117-28-180-172-16-255-1-67-117-28-180-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-67-117-28-180-172-16-255-1-67-117-28-180-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-67-117-28-180-172-16-255-1-67-117-28-180-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-67-117-28-180-172-16-255-1-67-117-28-180-data-udp-frame-eth-ip-port-50983.pcap.png
│           │   ├── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-70-67-177-253-172-16-255-1-70-67-177-253-rtcp-frame-eth-wsshort-udp-ip-port-50983.pcap
│           │   │   ├── 1
│           │   │   │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-70-67-177-253-172-16-255-1-70-67-177-253-rtcp-frame-eth-wsshort-udp-ip-port-50983.pcap.png
│           │   │   ├── 2
│           │   │   │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-70-67-177-253-172-16-255-1-70-67-177-253-rtcp-frame-eth-wsshort-udp-ip-port-50983.pcap.png
│           │   │   ├── 3
│           │   │   │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-70-67-177-253-172-16-255-1-70-67-177-253-rtcp-frame-eth-wsshort-udp-ip-port-50983.pcap.png
│           │   │   └── 4
│           │   │       └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-70-67-177-253-172-16-255-1-70-67-177-253-rtcp-frame-eth-wsshort-udp-ip-port-50983.pcap.png
│           │   └── trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-98-243-160-202-172-16-255-1-98-243-160-202-data-udp-frame-eth-ip-port-50983.pcap
│           │       ├── 1
│           │       │   └── map_ASN-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-98-243-160-202-172-16-255-1-98-243-160-202-data-udp-frame-eth-ip-port-50983.pcap.png
│           │       ├── 2
│           │       │   └── map_Private_RFC_1918-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-98-243-160-202-172-16-255-1-98-243-160-202-data-udp-frame-eth-ip-port-50983.pcap.png
│           │       ├── 3
│           │       │   └── map_Source_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-98-243-160-202-172-16-255-1-98-243-160-202-data-udp-frame-eth-ip-port-50983.pcap.png
│           │       └── 4
│           │           └── map_Destination_Ports-trace_a8e70a4fec2949e39acd78018326b021_2020-04-03_18_16_10-client-ip-98-243-160-202-172-16-255-1-98-243-160-202-data-udp-frame-eth-ip-port-50983.pcap.png
│           └── snort
│               └── metadata.json
└── redis
    └── appendonly.aof

113 directories, 316 files
```

