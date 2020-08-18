import { put, call, fork, all, takeLatest, select } from "redux-saga/effects";
import * as api from "./hospitalListAPIs";
import * as types from "./hospitalListTypes"
import { currentEnv } from "../../configs";




function* getHospitalList(data) {
  try {
    // const baseUrl = yield select(state => getBaseUrl(state.hospital));
    const response = yield call(api.getHospitalListAPI, `${currentEnv.RESTFULL_API_URL_V2}/mongo/hospital/list`);
    if (response.status !== 200 || response.data.error_code)
      throw new Error("Lỗi server!");
    if (response) {
      const { data } = response;
      const shortData = data.map((item, index) => {
        return { name: item.name, partnerId: item.partnerId }
      })
      yield put({ type: types.GET_HOSPITAL_LIST_SUCCESS, payload: shortData });
    }
  } catch (error) {
    yield put({ type: types.GET_HOSPITAL_LIST_FAIL, error });
  }
}
function* watchGetHospitalList() {
  yield takeLatest(types.GET_HOSPITAL_LIST, getHospitalList);
}




export default function* root() {
  yield all([
    fork(watchGetHospitalList),
  ]);
}
