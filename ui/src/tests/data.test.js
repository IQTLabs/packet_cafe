import {
  default as data,
  setResults,
  getResults,
  setToolStatus,
  getToolStatus
} from "domain/data";

import { combineReducers } from "redux";
import { expect } from "chai"

const reducer = combineReducers({ data });

describe("Data Reducer", () => {
  describe("actions", () => {
    describe("setResults", () => {
      it("sets the results for a session", (done) => {
        const results = {rows: [{"id": "ac3bc8a9be3541de9763e237332dbb5b", "filename": "printer-18-06-06.pcap", "tools": ["pcap_stats", "networkml", "pcapplot", "p0f", "snort"]}]};

        const action = setResults(results.rows );
        const result = reducer({}, action);

        expect(getResults(result).rows).to.deep.equal(results.rows);

        done();
      });

      it("sets the status for the analysis of a file ", (done) => {
        const fileId = "1fa431c9ca73449ca252d16613c38da9";
        const tools = {
          "ncapture": {
            "status": "Complete",
            "timestamp": 1587257405548
          },
          "pcap-stats": {
            "status": "Complete",
            "timestamp": 1587257410218
          },
          "pcap-dot1q": {
            "status": "In progress",
            "timestamp": 1587257405548
          },
          "mercury": {
            "status": "Complete",
            "timestamp": 1587257415051
          },
          "snort": {
            "status": "In progress",
            "timestamp": 1587257399616
          }
        };
        const payload = {
          "file": fileId,
          "tools": tools
        };

        const action = setToolStatus(payload);
        const result = reducer({}, action);

        expect(getToolStatus(result)[fileId]).to.deep.equal(tools);

        done();
      });
    });
  });
});

/*
[
  {
    "name": "pcapplot",
    "image": "iqtlabs/pcapplot",
    "version": "v0.1.7",
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
    "image": "iqtlabs/pcap_to_node_pcap",
    "version": "v0.11.16",
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
    "version": "v0.11.16",
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
    "image": "iqtlabs/tcprewrite_dot1q",
    "version": "v0.11.16",
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
    "version": "v0.6.1",
    "labels": "",
    "stage": "analysis",
    "viewableOutput": true,
    "command": [
      "-r"
    ],
    "environment": {
      "RABBIT_HOST": "messenger",
      "RABBIT_EXCHANGE": "",
      "RABBIT_ROUTING_KEY": "task_queue",
      "RABBIT_QUEUE": "True",
      "RABBIT_QUEUE_NAME": "task_queue"
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
    "version": "v0.11.16",
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
    "image": "iqtlabs/pcap_stats",
    "version": "v0.11.16",
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
    "version": "v0.11.16",
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
    "version": "v0.11.16",
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
*/