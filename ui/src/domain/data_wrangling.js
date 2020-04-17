import { createAction, handleActions } from "redux-actions";
import * as d3 from 'd3';


const defaultState = {
  heatmap: {
    ipResults:null,
    portResults:null
  },
  packetstats:null
};

const removeNumbersLessThan = (num, obj) => {
  for (var key in obj) {                    // for each key in the object
    if(!isNaN(obj[key]) && obj[key] < num)  // if the value of that key is not a NaN (is a number) and if that number is greater than num
      delete obj[key];                      // then delete the key-value from the object
  }
}

const configureHeatmapData = (payload) => {
  const data = payload.data;
  const firstKey = payload.firstKey;
  const secondKey = payload.secondKey;

  const mappedfirstKey = data.map((dat)=>{
    return dat[firstKey].toString();
  });

  const uniquemappedfirstKey = [...new Set(mappedfirstKey)];
  
  /**
   * Count of Source IP Keys by Destination IP Keys
  */

  var dataByFirstKeyBySecondKey = d3.nest()
    .key((d) => { return d[secondKey]; })
    .key((d) => { return d[firstKey]; })
    .rollup((v) => { 
      return v.length ; 
    })
    .object(data);
    
  var counts = Object.entries(dataByFirstKeyBySecondKey)
    .map(([firstKey, secondKeys]) => {
      return ({ firstKey, secondKeys });
    });

  var secondKeys = counts.map((dat)=>{
    return dat.secondKeys
  });

  var combinedData = counts.map((item, i) => Object.assign({}, item, secondKeys[i]));

  combinedData.map((dat) =>{
    Object.entries(dat).map(() => {
      delete dat.secondKeys
      return removeNumbersLessThan(1,dat)
    })
  })

  return {
    transformedData: combinedData,
    uniqueListOfKeys: uniquemappedfirstKey,
    dataType: payload.type
  }
}

const configurePacketStatistics = (payload) => {
  var endpointsArray = []

  for (var key in payload){
    if (key.includes('Endpoints')){
      var obj = {};
      obj.data = payload[key];
      obj.Type = key;
      endpointsArray.push(obj);
    }
  }


  /**
   * Statistics for Each Endpoint
  */

  const fullArray = endpointsArray.map((obj)=>{
    obj['Maximum Packet Size'] = d3.max(obj.data, function(d) { return d['Packets']; });
    obj['Minimum Packet Size'] = d3.min(obj.data, function(d) { return d['Packets']; });
    obj['Average Packet Size'] = d3.mean(obj.data, function(d) { return d['Packets']; });
    obj['Sum Packet Size'] = d3.sum(obj.data, function(d) { return d['Packets']; });

    obj['Maximum Bytes Size'] = d3.max(obj.data, function(d) { return d['Bytes']; });
    obj['Minimum Bytes Size'] = d3.min(obj.data, function(d) { return d['Bytes']; });
    obj['Average Bytes Size'] = d3.mean(obj.data, function(d) { return d['Bytes']; });
    obj['Sum Byte Size'] = d3.sum(obj.data, function(d) { return d['Bytes']; });
    
    return obj;
  });

  

  const filteredArray = fullArray.filter((obj)=>{
    //Remove undefined
    if (obj['data'].length > 1){
      return obj
    } 
  });

  const packetsum = d3.sum(filteredArray, function(d) { return d['Sum Packet Size']; });
  const bytesum = d3.sum(filteredArray, function(d) { return d['Sum Byte Size']; });

  /**
   * Percentages of Packet Size and Byte Size for each endpoint
  */
  var filteredArrayWithPercentages = filteredArray.map((item)=>{
    item["Percentage of Total Packet Size"] = item['Sum Packet Size'] / packetsum
    item["Percentage of Total Byte Size"] = item['Sum Byte Size'] / bytesum
 
    return item
  })

  // console.log(filteredArrayWithPercentages)

  return filteredArrayWithPercentages
}

// ACTIONS
const setHeatmapData = createAction("SET_HEATMAP_DATA");
const setPacketStatisticsData = createAction("SET_PACKETSTATS_DATA");

// REDUCERS
const reducer = handleActions(
  {
    [setHeatmapData]: (state, { payload }) => {
      const transformedData = configureHeatmapData(payload);
      if(payload.type == "ip"){
        state.heatmap.ipResults = transformedData;
        return{
          ...state
        }
      }
      else if(payload.type == "port"){
        state.heatmap.portResults = transformedData;
        return{
          ...state
        }
      }
      return { 
        ...state
      };
    },
    [setPacketStatisticsData]: (state, { payload }) => {
      const transformedData = configurePacketStatistics(payload);
      state.packetstats = transformedData;
      return{
        ...state
      }
    },
  },
  defaultState
);

const getDataWranglingState = (state) => state.data_wrangling;

export { setHeatmapData, setPacketStatisticsData, getDataWranglingState}

export default reducer;

