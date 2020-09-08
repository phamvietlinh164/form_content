import * as types from "./subfolAppIconsTypes";


export const listFile = (subfol) => {
  return {
    type: types.GET_LIST_FILE,
    payload: subfol
  };
};

export const newListFile = () => {
  return {
    type: types.GET_NEW_LIST_FILE,
  };
};

export const listSubFol = () => {
  return {
    type: types.GET_SUBFOL_LIST,
  };
};