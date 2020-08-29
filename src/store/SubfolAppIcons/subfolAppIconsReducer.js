import * as types from "./subfolAppIconsTypes";

const initialState = {
  subfolAppIcons: "image",
  listFileAppIcons: []
};

export default function manageContentReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_SUBFOL_APP_ICONS:
      return {
        ...state,
        subfolAppIcons: action.payload
      };
    case types.GET_LIST_FILE:
      return {
        ...state,
        // ...action.payload
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


    default:
      return state;
  }
}
