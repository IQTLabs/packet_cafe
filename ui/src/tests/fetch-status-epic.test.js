import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { setToolStatus } from "domain/data";
import rootEpic from 'epics/root-epic'
import { fetchToolStatus } from "epics/fetch-status-epic"

import fetchToolStatusEpic from "epics/fetch-status-epic"

//use dependency injection to test this epic without having to hit a real URL
//so that we can get consisten test results regardless of connectivity
describe("fetchToolStatusEpic", () => {
    const sessionId = uuidv4();
    const fileId = uuidv4();
    const data = {
          "tool1": {
            "state": "Queued",
            "timestamp": "2020-04-14 18:54:15.535827"
          },
          "tool2": {
            "state": "Complete",
            "timestamp": "2020-04-14 18:54:15.535827"
          },
          "tool3": {
            "state": "Started",
            "timestamp": "2020-04-14 18:54:15.535827"
          },
          "tool4": {
            "state": "In progress",
            "timestamp": "2020-04-14 18:54:15.535827"
          },
        };
    const mockResponse = data;
    const mockAjax = () => {
        return  of({ 'response': mockResponse });
      }

    const errMsg = "Fetch Error Test";
    const mockAjaxError = () => {
        throwError(errMsg);
    }

    const dependencies = {
      'ajax': mockAjax
    };

    let store;

    beforeEach(() => {
        const epicMiddleware = createEpicMiddleware();
        const mockStore = configureMockStore([epicMiddleware]);
        store  = mockStore();
        epicMiddleware.run(rootEpic, {'dependencies': dependencies});
    });

    afterEach(() => {
        
    });

    it("fetches an array of tool results", (done) => {
        let typeToCheck = setToolStatus.toString();
        const expected = {
          "tool1": {
            "status": "Queued",
            "timestamp": 1586904855535
          },
          "tool2": {
            "status": "Complete",
            "timestamp": 1586904855535
          },
          "tool3": {
            "status": "Started",
            "timestamp": 1586904855535
          },
          "tool4": {
            "status": "In progress",
            "timestamp": 1586904855535
          },
        };

        const action$ = of({'type': fetchToolStatus.toString(), 'payload': { 'sessionId': sessionId, 'fileId': fileId } });
        fetchToolStatusEpic(action$, store, mockAjax)
             .subscribe((actions) => {
                expect(actions.type).to.equal(typeToCheck);
                expect(actions.payload).to.deep.equal(expected);

                done();
            });
    });
});