import * as api from "../../constantHelper/API";

export const getListFileAPI = (url) => {
  return api.getHttpRequest(url);
};