import * as types from "./manageContentTypes";


export const getManageContent = (partnerId) => {
  // console.log(123);
  return {
    type: types.GET_MANAGE_CONTENT,
    partnerId
  };
};