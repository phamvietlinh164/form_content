import { all, fork } from "redux-saga/effects";

import getHospitalList from "./store/HospitalList/hospitalListSaga";




export default function* rootSaga() {
  yield all([
    fork(getHospitalList),
    // fork(ZabbixAlertSaga),
  ]);
}
