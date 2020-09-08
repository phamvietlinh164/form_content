import { put, call, fork, all, takeLatest, select } from "redux-saga/effects";
import * as api from "./subfolAppIconsAPIs";
import * as types from "./subfolAppIconsTypes"
import { currentEnv } from "../../configs";




function* getListFile(data) {

  try {
    const baseUrl = yield select(state => state.subfolAppIcons.subfolAppIcons);
    // console.log(baseUrl)
    // console.log(data)
    const url = baseUrl.length > 0 ? `${currentEnv.DOMAIN_URL}/getListFile/client-upload-AppIcon-${baseUrl}` : `${currentEnv.DOMAIN_URL}/getListFile/client-upload-AppIcon`
    const response = yield call(api.getListFileAPI, url);
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
  yield takeLatest(types.GET_LIST_FILE, getListFile);
}

function* getNewListFile(data) {

  try {
    const baseUrl = yield select(state => state.subfolAppIcons.subfolAppIcons);
    const listFileAppIcons = yield select(state => state.subfolAppIcons.listFileAppIcons);
    // console.log(baseUrl)
    // console.log(data)
    const url = baseUrl.length > 0 ? `${currentEnv.DOMAIN_URL}/getListFile/client-upload-AppIcon-${baseUrl}` : `${currentEnv.DOMAIN_URL}/getListFile/client-upload-AppIcon`
    const response = yield call(api.getListFileAPI, url);
    if (response.status !== 200 || response.data.error_code)
      throw new Error("Lỗi server!");
    if (response) {
      const { data } = response;
      // console.log(data)
      const shortData = data.filter(item => item)
      // console.log(shortData)
      // console.log(listFileAppIcons)
      var common = listFileAppIcons.filter(x => shortData.indexOf(x) !== -1)
      const newFile = [];
      shortData.forEach((ele) => {
        if (common.indexOf(ele) === -1) {
          newFile.push(ele);

        }
      })
      // console.log(shortData)
      // if (newFile.length > 0) {
      //   common.push(newFile)
      // }

      yield put({ type: types.GET_NEW_LIST_FILE_SUCCESS, payload: [...common, ...newFile] });
    }
  } catch (error) {
    yield put({ type: types.GET_NEW_LIST_FILE_FAIL, error });
  }
}
function* watchGetNewListFile() {
  yield takeLatest(types.GET_NEW_LIST_FILE, getNewListFile)
}




function* getListSubfol(data) {

  try {
    // const baseUrl = yield select(state => state.subfolAppIcons.subfolAppIcons);
    // console.log(baseUrl)
    const response = yield call(api.getListFileAPI, `${currentEnv.DOMAIN_URL}/getSubFol/client-upload-AppIcon`);
    if (response.status !== 200 || response.data.error_code)
      throw new Error("Lỗi server!");
    if (response) {
      const { data } = response;
      // console.log(data)
      // const shortData = data.filter(item => item)
      yield put({ type: types.GET_SUBFOL_LIST_SUCCESS, payload: data });
    }
  } catch (error) {
    yield put({ type: types.GET_SUBFOL_LIST_FAIL, error });
  }
}
function* watchGetListSubfol() {
  yield takeLatest(types.GET_SUBFOL_LIST, getListSubfol);
}




export default function* root() {
  yield all([
    fork(watchGetListFile),
    fork(watchGetNewListFile),
    fork(watchGetListSubfol),
  ]);
}
