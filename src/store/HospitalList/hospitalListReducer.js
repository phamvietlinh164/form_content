import * as types from "./hospitalListTypes";

const initialState = [];

export default function hospitalListReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_HOSPITAL_LIST:
      return [
        ...state,
        // ...action.payload
      ];
    case types.GET_HOSPITAL_LIST_SUCCESS:
      return [
        ...state,
        ...action.payload
      ];
    case types.GET_HOSPITAL_LIST_FAIL:
      return [
        ...state,
        ...action.error
      ];


    default:
      return state;
  }
}
