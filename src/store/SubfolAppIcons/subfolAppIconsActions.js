import * as types from "./subfolAppIconsTypes";


export const selectSubfolAppIcons = (subfol) => {
  return {
    type: types.SELECT_SUBFOL_APP_ICONS,
    payload: subfol
  };
};