import * as types from "./manageContentTypes";

const initialState = {
  partnerId: localStorage.getItem('hospital') || "dkkvangiang",
  content: []
};

export default function manageContentReducer(state = initialState, action = {}) {

  switch (action.type) {

    case types.GET_MANAGE_CONTENT:
      return {
        ...state,
        partnerId: action.partnerId
        // ...action.payload
      };
    case types.GET_MANAGE_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload
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
