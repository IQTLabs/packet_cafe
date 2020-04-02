import { createAction, handleActions } from "redux-actions";
import * as d3 from 'd3';


const defaultState = {
  heatmap: {
    ipResults:null,
    portResults:null
  }
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
    return dat[firstKey]
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

// ACTIONS
const setHeatmapData = createAction("SET_HEATMAP_DATA");

// REDUCERS
const reducer = handleActions(
  {
    [setHeatmapData]: (state, { payload }) => {
      const transformedData = configureHeatmapData(payload);
      if(payload.type == "ip"){
        state.heatmap.ipResults = transformedData;
        console.log(transformedData);
        return{
          ...state
        }
      }
      else if(payload.type == "port"){
        state.heatmap.portResults = transformedData;
        console.log(transformedData);
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

