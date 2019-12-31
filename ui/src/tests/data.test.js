import {
  default as data,
  setResults,
  getResults,
} from "domain/data";

import { combineReducers } from "redux";
import { expect } from "chai"

const uuidv4 = require('uuid/v4');

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
    });
  });
});
