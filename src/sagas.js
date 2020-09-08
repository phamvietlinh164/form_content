import { all, fork } from "redux-saga/effects";

import getHospitalList from "./store/HospitalList/hospitalListSaga";
import getManageContent from "./store/ManageContent/manageContentSaga";
import getListFile from "./store/SubfolAppIcons/subfolAppIconsSaga";




export default function* rootSaga() {
  yield all([
    fork(getHospitalList),
    fork(getManageContent),
    // fork(getManageContent),
    fork(getListFile),
    // fork(ZabbixAlertSaga),
  ]);
}
