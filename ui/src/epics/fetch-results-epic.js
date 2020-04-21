import { createAction } from 'redux-actions';
import { ofType } from 'redux-observable';
import { of, EMPTY } from 'rxjs';
import { ajax  as rxAjax } from 'rxjs/ajax';
import { catchError, debounceTime, mergeMap, map } from 'rxjs/operators';

import { setResults } from "domain/data";
//import { setError } from "domain/error";

// ACTIONS
const fetchResults = createAction('FETCH_RESULTS');

// EPIC
const fetchResultsEpic = (action$, store, ajax = rxAjax) => {
  return action$.pipe(
    ofType(fetchResults.toString())
    ,debounceTime(500)
    ,mergeMap((action) => {
      const sessionId = action.payload.sessionId;
      const url = '/ids/' + sessionId;
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
      return EMPTY;
      //return of(setError(newErr));
    })
  );
}

export default fetchResultsEpic;
export { fetchResults };
