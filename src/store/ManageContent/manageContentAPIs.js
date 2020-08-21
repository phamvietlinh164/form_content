import * as api from "../../constantHelper/API";

export const getManageContentAPI = (url) => {
  return api.getHttpRequest(url);
};