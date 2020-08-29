import * as types from "./manageContentTypes";


export const getManageContent = (partnerId) => {
  return {
    type: types.GET_MANAGE_CONTENT,
    partnerId
  };
};