import { createAction } from 'redux-actions';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax  as rxAjax } from 'rxjs/ajax';
import { catchError, debounceTime, mergeMap, map } from 'rxjs/operators';

import { setTools } from "domain/data";

// ACTIONS
const fetchTools = createAction('FETCH_TOOLS');

// EPIC
const fetchToolsEpic = (action$, store, ajax = rxAjax) => {
  return action$.pipe(
    ofType(fetchTools.toString())
    ,debounceTime(500)
    ,mergeMap((action) => {
      const url = '/tools';
      return ajax({ 'url': url, 'crossDomain': true, 'responseType': 'json' }).pipe(
        map((result) => {
          const resp = result.response;
          const tools = [];
          const keys = Object.keys(resp);
          for(const key of keys){
            const items = resp[key];
            for(const item of items){
              tools.push(item);
            }
          }
          return tools;
        })
        ,map(setTools)
      );
    })
    ,catchError((error) => {
      console.log("error xhr: %o", error)
      const newErr = new Error("Error fetching Tools: " + error.message);
    })
  );
}

export default fetchToolsEpic;
export { fetchTools };
