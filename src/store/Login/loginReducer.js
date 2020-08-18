import * as types from "./loginTypes";

const initialState = {
  username: { value: "" },
  password: { value: "" }

};

export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_FIELD_LOGIN:
      return {
        ...state,
        ...action.payload
      };


    default:
      return state;
  }
}
