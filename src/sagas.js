import { all, fork } from "redux-saga/effects";

import getHospitalList from "./store/HospitalList/hospitalListSaga";
import getManageContent from "./store/ManageContent/manageContentSaga";




export default function* rootSaga() {
  yield all([
    fork(getHospitalList),
    fork(getManageContent),
    // fork(ZabbixAlertSaga),
  ]);
}
