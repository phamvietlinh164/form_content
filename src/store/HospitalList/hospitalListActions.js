import * as types from "./hospitalListTypes";


export const getHospitalList = () => {
  return {
    type: types.GET_HOSPITAL_LIST,
  };
};

