import { combineReducers } from "redux";

import login from "./store/Login/loginReducer"
import hospitalList from "./store/HospitalList/hospitalListReducer"
import manageContent from "./store/ManageContent/manageContentReducer"
import subfolAppIcons from "./store/SubfolAppIcons/subfolAppIconsReducer"


export default combineReducers({
  login,
  hospitalList,
  manageContent,
  subfolAppIcons

});
