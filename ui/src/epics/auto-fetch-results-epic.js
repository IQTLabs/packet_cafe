import { createAction } from 'redux-actions';
import { ofType } from 'redux-observable';
import { timer, of, EMPTY } from 'rxjs';
import { ajax  as rxAjax } from 'rxjs/ajax';
import { catchError, debounceTime, mergeMap, takeUntil } from 'rxjs/operators';

import { fetchResults } from 'epics/fetch-results-epic'

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
      console.log("autoFetchResults Called");
      return timer(0, interval).pipe(
          mergeMap(() => {
            return of(
              fetchResults({'sessionId': sessionId})
            )
          })
        ,takeUntil(action$.ofType(stopFetchResults.toString()))
        )
    })
  );
}

export default autoFetchResultsEpic;
export { startFetchResults, stopFetchResults };
