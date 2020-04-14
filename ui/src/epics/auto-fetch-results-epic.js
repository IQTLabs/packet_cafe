import { createAction } from 'redux-actions';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax  as rxAjax } from 'rxjs/ajax';
import { catchError, debounceTime, mergeMap, map } from 'rxjs/operators';

import { setResults } from "domain/data";
//import { setError } from "domain/error";

// ACTIONS
const startFetchResults = createAction('START_FETCH_RESULTS');
const stopFetchResults = createAction('STOP_FETCH_RESULTS');

// EPIC
const autoFetchResultsEpic = (action$, store, ajax = rxAjax) => {
  return action$.pipe(
    ofType(startFetchResults.toString())
    ,debounceTime(500)
    ,mergeMap((action) => {
      const sessionId = action.payload.sessionId;
      const interval = action.payload.interval * 1000;
      return timer(0, interval).pipe(
          mergeMap(() => {
            return of(
              fetchDataset({'sessionId': sessionId})
            )
          })
        ,takeUntil(action$.ofType(stopRefresh.toString()))
        )
    })
    ,catchError((error) => {
      console.log("error xhr: %o", error)
      const newErr = new Error("Error fetching results: " + error.message);
      //return of(setError(newErr));
    })
  );
}

export default autoFetchResultsEpic;
export { startFetchResults, stopFetchResults };
