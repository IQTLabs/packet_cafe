import { combineReducers } from "redux";
import data from "./data";
import data_wrangling from "./data_wrangling";
// import controls from "./controls";
// import error from "./error";

export default combineReducers({
  data,
  data_wrangling
  //controls,
  //error,
});