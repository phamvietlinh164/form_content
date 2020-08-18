import * as types from "./loginTypes";


export const saveFieldLogin = fields => {
  return {
    type: types.SAVE_FIELD_LOGIN,
    payload: fields
  };
};