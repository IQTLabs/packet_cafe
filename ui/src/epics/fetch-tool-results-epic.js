import { createAction } from 'redux-actions';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax  as rxAjax } from 'rxjs/ajax';
import { catchError, debounceTime, mergeMap, map } from 'rxjs/operators';

import { setResults } from "domain/data";
//import { setError } from "domain/error";

// ACTIONS
const fetchToolResults = createAction('FETCH_TOOL_RESULTS');

// EPIC
const fetchToolResultsEpic = (action$, store, ajax = rxAjax) => {
  return action$.pipe(
    ofType(fetchToolResults.toString())
    ,debounceTime(500)
    ,mergeMap((action) => {
      const tool = action.payload.tool;
      const counter = action.payload.counter;
      const sessionId = action.payload.sessionId;
      const reqId = action.payload.reqId;
      const url = "/raw/" + tool + "/" + counter + "/" + sessionId + "/" + reqId;
      return ajax({ 'url': url, 'crossDomain': true, 'responseType': 'json' }).pipe(
        map((result) => { 

          return result.response ;
        })
        ,map(setResults)
      );
    })
    ,catchError((error) => {
      console.log("error xhr: %o", error)
      const newErr = new Error("Error fetching results: " + error.message);
      //return of(setError(newErr));
    })
  );
}

export default fetchToolResultsEpic;
export { fetchToolResults };
