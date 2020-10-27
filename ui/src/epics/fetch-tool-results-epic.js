import { createAction } from 'redux-actions';
import { ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import { ajax  as rxAjax } from 'rxjs/ajax';
import { catchError, mergeMap, map, concatMap } from 'rxjs/operators';

import { setToolResults } from "domain/data";
//import { setError } from "domain/error";

// ACTIONS
const fetchToolResults = createAction('FETCH_TOOL_RESULTS');

// EPIC
const fetchToolResultsEpic = (action$, store, ajax = rxAjax) => {
  return action$.pipe(
    ofType(fetchToolResults.toString())
    ,mergeMap((action) => {
      const tool = action.payload.tool;
      const sessionId = action.payload.sessionId;
      const fileId = action.payload.fileId;
      const url = "/raw/"  + sessionId + "/" + fileId + "/" + tool;
      return ajax({ 'url': url, 'crossDomain': true, 'responseType': 'json' }).pipe(
        map((result) => { 
          return {'tool': tool, 'file': fileId, 'results': result.response };
        })
        ,map(setToolResults)

      );
    })
    ,catchError((error) => {
      console.log("error xhr: %o", error)
      return EMPTY;
    })
  );
}

export default fetchToolResultsEpic;
export { fetchToolResults };
