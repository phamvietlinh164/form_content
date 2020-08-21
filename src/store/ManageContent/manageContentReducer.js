import * as types from "./manageContentTypes";

const initialState = {};

export default function manageContentReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_MANAGE_CONTENT:
      return {
        ...state,
        // ...action.payload
      };
    case types.GET_MANAGE_CONTENT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case types.GET_MANAGE_CONTENT_FAIL:
      return {
        ...state,
        ...action.error
      };


    default:
      return state;
  }
}
