import { createAction } from 'redux-actions';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax  as rxAjax } from 'rxjs/ajax';
import { catchError, debounceTime, mergeMap, map } from 'rxjs/operators';

import { setToolStatus } from "domain/data";
//import { setError } from "domain/error";

// ACTIONS
const fetchToolStatus = createAction('FETCH_TOOL_STATUS');

// EPIC
const fetchToolStatusEpic = (action$, store, ajax = rxAjax) => {
  return action$.pipe(
    ofType(fetchToolStatus.toString())
    ,mergeMap((action) => {
      const sessionId = action.payload.sessionId;
      const fileId = action.payload.fileId;
      const url = '/status/' + sessionId + '/' + fileId;
      return ajax({ 'url': url, 'crossDomain': true, 'responseType': 'json' }).pipe(
        map((result) => {
          const resp = result.response;
          const tools = {};
          const keys = Object.keys(resp);
          for(const key of keys){
            const item = resp[key];
            if(item instanceof Object && item["state"] && item["timestamp"]){
              const ts = Date.parse(item["timestamp"].replace(" ", "T"))
              tools[key] = {"status":item["state"], 'timestamp': ts};
            }
          }
          return {'file': fileId, 'tools': tools};
        })
        ,map(setToolStatus)
      );
    })
    ,catchError((error) => {
      console.log("error xhr: %o", error)
      const newErr = new Error("Error fetching Status: " + error.message);
      //return of(setError(newErr));
    })
  );
}

export default fetchToolStatusEpic;
export { fetchToolStatus };
