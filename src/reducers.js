import { combineReducers } from "redux";

import login from "./store/Login/loginReducer"
import hospitalList from "./store/HospitalList/hospitalListReducer"


export default combineReducers({
  login,
  hospitalList

});
