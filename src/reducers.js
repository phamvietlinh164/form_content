import { combineReducers } from "redux";

import login from "./store/Login/loginReducer"
import hospitalList from "./store/HospitalList/hospitalListReducer"
import manageContent from "./store/ManageContent/manageContentReducer"


export default combineReducers({
  login,
  hospitalList,
  manageContent,

});
