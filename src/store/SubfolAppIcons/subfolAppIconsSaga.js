import { put, call, fork, all, takeLatest, select } from "redux-saga/effects";
import * as api from "./subfolAppIconsAPIs";
import * as types from "./subfolAppIconsTypes"
import { currentEnv } from "../../configs";




function* getListFile(data) {
  try {
    const baseUrl = yield select(state => state.subfolAppIcons.subfolAppIcons);

    const response = yield call(api.getListFileAPI, `${currentEnv.DOMAIN_URL}/getListFile/client-upload-AppIcon-${baseUrl}`);
    if (response.status !== 200 || response.data.error_code)
      throw new Error("Lỗi server!");
    if (response) {
      const { data } = response;
      // console.log(data)
      const shortData = data.filter(item => item)
      yield put({ type: types.GET_LIST_FILE_SUCCESS, payload: shortData });
    }
  } catch (error) {
    yield put({ type: types.GET_LIST_FILE_FAIL, error });
  }
}
function* watchGetListFile() {
  yield takeLatest(types.SELECT_SUBFOL_APP_ICONS, getListFile);
}




export default function* root() {
  yield all([
    fork(watchGetListFile),
  ]);
}
