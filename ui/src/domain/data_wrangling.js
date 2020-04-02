import { createAction, handleActions } from "redux-actions";
import * as d3 from 'd3';


const defaultState = {
  heatmap: {
    ipResults:null,
    portResults:null
  }
};

const configureHeatmapData = (jsonData, firstKey, secondKey) =>{

  const mappedDst_ip = jsonData.map((dat)=>{
    return dat.dst_ip
  });

  const uniquemappedDst_ip = [...new Set(mappedDst_ip)];
  
  /**
   * Count of Source IP Keys by Destination IP Keys
   */

  var dataByDstIPbySrcIP = d3.nest()
    .key((d) => { return d.src_ip; })
    .key((d) => { return d.dst_ip; })
    .rollup((v) => { return v.length; })
    .object(jsonData);
    
  var counts = Object.entries(dataByDstIPbySrcIP)
    .map(([dst_ip, src_ips]) => {
      return ({ dst_ip, src_ips });
    });

  var src_ips = counts.map((dat)=>{
    return dat.src_ips
  });

  return {
    transformedData: counts.map((item, i) => Object.assign({}, item, src_ips[i])),
    uniqueListOfKeys: uniquemappedDst_ip
  }
}

// ACTIONS
const setHeatmapData = createAction("SET_HEATMAP_DATA");

// REDUCERS
const reducer = handleActions(
  {
    [setHeatmapData]: (state, { payload }) => {
      if(payload.type == "ip"){
        const transformedData = configureHeatmapData(payload.data);
        state.heatmap.ipResults = transformedData;
        return{
          ...state
        }
      }
      else if(payload.type == "port"){
        const transformedData = configureHeatmapData(payload.data);
        state.heatmap.portResults = transformedData;
        return{
          ...state
        }
      }
      return { 
        ...state
      };
    },
  },
  defaultState
);

const getDataWranglingState = (state) => state.data_wrangling;



export { setHeatmapData, getDataWranglingState}

export default reducer;

