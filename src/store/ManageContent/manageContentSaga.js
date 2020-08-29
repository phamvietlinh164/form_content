import { put, call, fork, all, takeLatest, select } from "redux-saga/effects";
import * as api from "./manageContentAPIs";
import * as types from "./manageContentTypes"
import { currentEnv } from "../../configs";




function* getManageContent(action) {
  // console.log(action)
  try {
    // const manageContent = yield select(state => state.manageContent);
    // console.log(manageContent)
    const response = yield call(api.getManageContentAPI, `${currentEnv.DOMAIN_URL}/content/${action.partnerId}`);
    if (response.status !== 200 || response.data.error_code)
      throw new Error("Lỗi server!");

    if (response) {
      const { data } = response;
      // console.log(data.imageManage);
      const payload = data.imageManage ? data.imageManage : []
      // const shortData = data.map((item, index) => {
      //   return { name: item.name, partnerId: item.partnerId }
      // })
      yield put({ type: types.GET_MANAGE_CONTENT_SUCCESS, payload });
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
