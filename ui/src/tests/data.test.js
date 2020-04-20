import {
  default as data,
  setResults,
  getResults,
  setToolStatus,
  getToolStatus
} from "domain/data";

import { combineReducers } from "redux";
import { expect } from "chai"
import { v4 as uuidv4 } from 'uuid';

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
