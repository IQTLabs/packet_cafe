import { createAction, handleActions } from "redux-actions";

const defaultState = {
  sessionId: null,
  results: {
    rows:[],
    columns:['id']
  },
  toolStatus: {},
  isLoading: false
};



// ACTIONS
const setResults = createAction("SET_RESULTS");
const setToolStatus = createAction("SET_TOOL_STATUS");

// REDUCERS
const reducer = handleActions(
  {
    [setResults]: (state, { payload }) => {
      const resultRows = payload;
      state.results.rows = resultRows
      return { ...state};
    },
    [setToolStatus]: (state, { payload }) => {
      if(!state.toolStatus) state.toolStatus ={};

      const tools = payload;

      for(const toolName in tools){
        const existing = state.toolStatus[toolName];
        const tool = tools[toolName];
        if(existing == null || tool.timestamp > existing.timestamp){
           state.toolStatus[toolName] = tool;
        }
      }

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
  //results = {rows: [{"id": "ac3bc8a9be3541de9763e237332dbb5b", "filename": "printer-18-06-06.pcap", "tools": ["pcap_stats", "networkml", "pcapplot", "p0f", "snort"]}]};
  return results || defaultState.results;
}

const _getToolStatuses = (toolStatuses, toolId) => {
  const status = toolStatuses && toolId ? toolStatuses[toolId] : (toolStatuses || {} )
  return status;
}

// SELECTORS
const getResults = (state) => {
  return _getResults(state.data.results);
}
const getToolStatus = (state, toolId) => {
  return _getToolStatuses(state.data.toolStatus || {}, toolId)
}
const getToolStatuses = (state) => {
  return _getToolStatuses(state.data.toolStatus || {}, null)
}

export default reducer;

export { setResults, getResults, setToolStatus, getToolStatus, getToolStatuses }
