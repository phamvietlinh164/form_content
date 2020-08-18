import * as api from "../../constantHelper/API";

export const getHospitalListAPI = (url) => {
  return api.getHttpRequest(url);
};