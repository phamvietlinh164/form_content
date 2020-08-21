import { put, call, fork, all, takeLatest, select } from "redux-saga/effects";
import * as api from "./manageContentAPIs";
import * as types from "./manageContentTypes"
import { currentEnv } from "../../configs";




function* getManageContent(data) {
  try {
    // const baseUrl = yield select(state => getBaseUrl(state.hospital));
    const response = yield call(api.getManageContentAPI, `${currentEnv.DOMAIN_URL}/static/upload/hospitals/manageContent/manageContent.json`);
    if (response.status !== 200 || response.data.error_code)
      throw new Error("Lỗi server!");
    if (response) {
      const { data } = response;
      // const shortData = data.map((item, index) => {
      //   return { name: item.name, partnerId: item.partnerId }
      // })
      yield put({ type: types.GET_MANAGE_CONTENT_SUCCESS, payload: data });
    }
  } catch (error) {
    yield put({ type: types.GET_MANAGE_CONTENT_FAIL, error });
  }
}
function* watchGetManageContent() {
  yield takeLatest(types.GET_MANAGE_CONTENT, getManageContent);
}




export default function* root() {
  yield all([
    fork(watchGetManageContent),
  ]);
}
