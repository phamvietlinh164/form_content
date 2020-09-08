import * as types from "./subfolAppIconsTypes";

const initialState = {
  subfolAppIcons: "image",
  listFileAppIcons: [],
  listSubFol: []
};

export default function manageContentReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LIST_FILE:
      return {
        ...state,
        subfolAppIcons: action.payload
      };

    case types.GET_LIST_FILE_SUCCESS:
      return {
        ...state,
        listFileAppIcons: action.payload
      };
    case types.GET_LIST_FILE_FAIL:
      return {
        ...state,
        ...action.error
      };

    case types.GET_NEW_LIST_FILE:
      return {
        ...state,
      };

    case types.GET_NEW_LIST_FILE_SUCCESS:
      return {
        ...state,
        listFileAppIcons: action.payload
      };
    case types.GET_NEW_LIST_FILE_FAIL:
      return {
        ...state,
        ...action.error
      };

    case types.GET_SUBFOL_LIST_SUCCESS:
      return {
        ...state,
        listSubFol: action.payload
      };
    case types.GET_SUBFOL_LIST_FAIL:
      return {
        ...state,
        ...action.error
      };


    default:
      return state;
  }
}
