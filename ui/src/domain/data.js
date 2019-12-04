import { createAction, handleActions } from "redux-actions";

const defaultState = {
  sessionId: null,
  results: {
    rows:[],
    columns:['id']
  },
};



// ACTIONS

const setResults = createAction("SET_RESULTS");

// REDUCERS
const reducer = handleActions(
  {
    [setResults]: (state, { payload }) => {
      const datasets = payload.datasets;
      Object.keys(datasets).forEach((key) => {
        state.datasets[key] = datasets[key];
      })
      
      return { ...state};
    },
  },
  defaultState
);

//methods where we need to deal with state both inside and outside of the reducer
//outside of the reducer state represents the entire state tree, but inside of the
//reducer the provided state is only the state for the reducer's subset of the 
//state tree.  to avoid duplication of code these methods will be called be used
//internally from the reducer.  and methods that recieve the full state tree will 
//pare the tree down to just the relevant attributes. in these cases the
//variable "dataset" will represent the segment of the state tree owned by the datset reducer.
const _getResults = (results) => {
  results = {rows: [{"id": "ac3bc8a9be3541de9763e237332dbb5b", "filename": "printer-18-06-06.pcap", "tools": ["pcap_stats", "networkml", "pcapplot", "p0f", "snort"]}]};
  return results || defaultState.results;
}

// SELECTORS
const getResults = (state) => {
  return _getResults(state.results);
}

export default reducer;

export { setResults, getResults}