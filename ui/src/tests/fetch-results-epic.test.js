import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { setResults } from "domain/data";
import rootEpic from 'epics/root-epic'
import { fetchResults } from "epics/fetch-results-epic"

import fetchResultsEpic from "epics/fetch-results-epic"

//use dependency injection to test this epic without having to hit a real URL
//so that we can get consisten test results regardless of connectivity
describe("fetchResultsEpic", () => {
    const sessionId = uuidv4();
    const data = {
          "tool1": {
            "status": "Queued",
            "timestamp": "2020-04-14T18:54:15.535827+00:00"
          },
          "tool2": {
            "status": "Complete",
            "timestamp": "2020-04-14T18:54:15.535827+00:00"
          },
          "tool3": {
            "status": "Started",
            "timestamp": "2020-04-14T18:54:15.535827+00:00"
          },
          "tool4": {
            "status": "In progress",
            "timestamp": "2020-04-14T18:54:15.535827+00:00"
          },
        };
    const mockResponse = data;
    const mockAjax = () => {
      return  of({ 'response': mockResponse });
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
        let typeToCheck = setResults.toString();

        const action$ = of({'type': fetchResults.toString(), 'payload': { 'sessionId': sessionId } });
        fetchResultsEpic(action$, store, mockAjax)
             .subscribe((actions) => {
                expect(actions.type).to.equal(typeToCheck);
                expect(actions.payload).to.equal(data);

                done();
            });
    });
});
