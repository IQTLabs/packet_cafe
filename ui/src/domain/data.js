import { createAction, handleActions } from "redux-actions";

const defaultState = {
  sessionId: null,
  fileId: null,
  results: {
    rows:[],
    columns:['id']
  },
  toolStatus: {},
  toolResults: {},
  deviceTableModel: null,
  deviceGroupModel: {},
  statsModel: {},
  isLoading: false
};

const emptyGroups = {
        "unknown": {"totalConfidence": 0, "count": 0},
        "administrator workstation": {"totalConfidence": 0, "count": 0},
        "business workstation": {"totalConfidence": 0, "count": 0},
        "developer workstation": {"totalConfidence": 0, "count": 0},
        "active directory controller": {"totalConfidence": 0, "count": 0},
        "administrative server": {"totalConfidence": 0, "count": 0},
        "confluence server": {"totalConfidence": 0, "count": 0},
        "exchange server": {"totalConfidence": 0, "count": 0},
        "file share": {"totalConfidence": 0, "count": 0},
        "git server": {"totalConfidence": 0, "count": 0},
        "gpu laptop": {"totalConfidence": 0, "count": 0}, 
        "pki server": {"totalConfidence": 0, "count": 0},
        "printer": {"totalConfidence": 0, "count": 0},
};
     

const getOsFromPof = (pofData, ip) => {
  for(const item of pofData){
    if(item[ip] && item[ip]["short_os"]){
      return item[ip]["short_os"];
    }
  }
  return "";
}

//tool model functions
const networkMldeviceTableModel = async (state) => {
  const model = {};;
  if(state.toolResults){
    for(const file in state.toolResults){
      const nmlData = state.toolResults[file]["networkml"];
      const pofData = state.toolResults[file]["p0f"]?state.toolResults[file]["p0f"].filter((o)=> Object.keys(o).length > 1):[];
      model[file] = [];
      if(nmlData){
        for(const o of nmlData){
          if(o[file]){
            const device = {};
            device["OS"] = getOsFromPof(pofData, o[file]["source_ip"]);
            device["IP"] = o[file]["source_ip"];
            device["MAC"] = o[file]["source_mac"];
            device["networkMlLabels"] = o[file].classification.labels.map((l, idx) =>{
              return { "label": l, "confidence": o[file].classification.confidences[idx] }
            })
            model[file].push(device);
          }
        }
      }
    }
  }
  state.deviceTableModel = model;
}

const networkMldeviceGroupModel = async (state) => {
  if(state.toolResults){
    for(const file in state.toolResults){
      const nmlData = state.toolResults[file]["networkml"];
      let fileGroupModel = JSON.parse(JSON.stringify(emptyGroups));
      if(nmlData){
        for(const o of nmlData){      
          if(o[file] && o[file].classification &&
             o[file].classification.labels.length > 0 &&
             o[file].classification.confidences.length > 0 &&
             o[file].classification.labels[0]
             )
          {
              fileGroupModel[o[file].classification.labels[0].toLowerCase()]["totalConfidence"] += o[file].classification.confidences[0];
              fileGroupModel[o[file].classification.labels[0].toLowerCase()]["count"]++;
          }
        }
      }
      state["deviceGroupModel"][file] = fileGroupModel;
    }
  }
}

const generateFileSummary = (data) =>{
  let fs ={}
  if(data && data[2] && data[2]["capinfos"]){
    const capinfos = data[2]["capinfos"];
    const avgSize = capinfos["Average packet size"];
    const duration = capinfos["Capture duration"];
    const fileSize = capinfos["File size"];
    const fileName = capinfos["File name"].split('/').pop();
    const dataSize = capinfos["Data size"];
    const totalPackets = Object.keys(capinfos["interfaces"]).reduce((total, key) => {
      return total + parseInt(capinfos["interfaces"][key]["Number of packets"], 10)
    },0);

    fs = {
      "fileName": fileName,
      "fileSize": fileSize,
      "dataSize": dataSize,
      "avgSize": avgSize,
      "duration": duration,
      "totalPackets": totalPackets
    }
  }

  return fs;
}

const generateTrafficSummary = (data) =>{
  let traffic ={ };
  if(data && Array.isArray(data) && data.length >= 1 && data[0]["convcontents"]){
    const convcontents = data[0]["convcontents"]
    const packets = {
      "plaintext": convcontents["Plaintext Packets"] || 0,
      "encrypted": convcontents["Encrypted Packets"] || 0,
      "unknown": convcontents["Unknown Packets"] || 0,
      "total": (convcontents["Plaintext Packets"]  || 0) + (convcontents["Encrypted Packets"] || 0) + (convcontents["Unknown Packets"] || 0),
    };
    const bytes = {
      "plaintext": convcontents["Plaintext Bytes"] || 0,
      "encrypted": convcontents["Encrypted Bytes"] || 0,
      "unknown": convcontents["Unknown Bytes"] || 0,
      "total": (convcontents["Plaintext Bytes"] || 0) + (convcontents["Encrypted Bytes"] || 0) + (convcontents["Unknown Bytes"]  || 0),
    };
    const pConvos = convcontents["Plaintext Conversations"] && Array.isArray(convcontents["Plaintext Conversations"]) ? 
                    convcontents["Plaintext Conversations"].length : 0;
    const eConvos = convcontents["Encrypted Conversations"] && Array.isArray(convcontents["Encrypted Conversations"]) ? 
                    convcontents["Encrypted Conversations"].length : 0;
    const uConvos = convcontents["Unknown Conversations"] && Array.isArray(convcontents["Unknown Conversations"]) ? 
                    convcontents["Unknown Conversations"].length : 0;
    const convos = {
      "plaintext": pConvos,
      "encrypted": eConvos,
      "unknown": uConvos,
      "total": pConvos + eConvos + uConvos,
    };
    traffic = {
      "packets":packets,
      "bytes": bytes,
      "conversations": convos,
    };
  }
  return traffic;
}

const pcapStatsModel = async (state) => {
  for(const file in state.toolResults){
    const statsData = state.toolResults[file]["pcap-stats"];
    if(! state.statsModel[file])
      state.statsModel[file] = {};
    state.statsModel[file]["fileSummary"] = generateFileSummary(statsData);
    state.statsModel[file]["trafficSummary"] = generateTrafficSummary(statsData);
  }
}

//tool callbacks
const toolCallbacks = {
  "networkml":[networkMldeviceTableModel, networkMldeviceGroupModel],
  "p0f":[networkMldeviceTableModel],
  "pcap-stats":[pcapStatsModel],
}



// ACTIONS
const setSessionId = createAction("SET_SESSION_ID");
const setFileId = createAction("SET_FILE_ID");
const setResults = createAction("SET_RESULTS");
const setToolStatus = createAction("SET_TOOL_STATUS");
const setToolResults = createAction("SET_TOOL_RESULTS");
const setTools = createAction("SET_TOOLS");

const generateViewModels = async (state, toolName) => {
  if(toolCallbacks[toolName])
    toolCallbacks[toolName].forEach((func) => func(state));
}

// REDUCERS
const reducer = handleActions(
  {
    [setSessionId]: (state, { payload }) => {
      state.sessionId = payload;
      return { ...state};
    },
    [setFileId]: (state, { payload }) => {
      state.fileId = payload;
      return { ...state};
    },
    [setResults]: (state, { payload }) => {
      const resultRows = payload;
      state.results.rows = resultRows
      if(!state.fileId && resultRows.length > 0 && resultRows[0].id){
        state.fileId = resultRows[0].id;
      }
      return { ...state};
    },
    [setTools]: (state, { payload }) => {
      state.tools = payload;
      
      return { ...state};
    },
    [setToolStatus]: (state, { payload }) => {
      if(!state.toolStatus) state.toolStatus ={};
      const file = payload.file
      const tools = payload.tools;
      const fileToolStatus = state.toolStatus[file];
      if(!fileToolStatus)
        state.toolStatus[file] = {};
      for(const toolName in tools){
        const existing = fileToolStatus ? fileToolStatus[toolName] : null;
        const tool = tools[toolName];
        if(existing == null || tool.timestamp > existing.timestamp){
           state.toolStatus[file][toolName] = tool;
        }
        if(tool.status === "Complete"){
          generateViewModels(state, toolName);
        }
      }
      return { ...state};
    },
    [setToolResults]: (state, { payload }) => {
      if(!state.toolResults) state.toolResults ={};
      const tool = payload.tool;
      const file = payload.file;
      const results = payload.results;
      if(!state.toolResults[file]) state.toolResults[file] ={};
      state.toolResults[file][tool] = results;

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

const _getToolResults = (toolResults, toolId) => {
  const results = toolResults && toolId ? toolResults[toolId] : (toolResults || {} )
  return results;
}

const _getTools = (tools) => {
  return tools;
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
const getAllToolResults = (state) => {
  return _getToolResults(state.data.toolResults || {}, null)
}
const getToolResults = (state, toolId) => {
  return _getToolResults(state.data.toolResults || {}, toolId)
}
const getTools = (state) => {
  return _getTools(state.data.tools || [])
}
const getdeviceTableModel = (state, filename) =>{
  return state.data.deviceTableModel[filename] || {};
}
const getSessionId = (state) =>{
  return state.data.sessionId;
}
const getFileId = (state) =>{
  return state.data.fileId;
}

export default reducer;

export { setSessionId, setFileId, setResults, setTools, getResults, setToolStatus, getToolStatus, getToolStatuses, getTools, 
        setToolResults, getAllToolResults, getToolResults, getSessionId, getFileId, getdeviceTableModel }
