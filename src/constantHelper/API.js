import axios from "axios";

export const getHttpRequest = async url => axios.get(url);
export const postHttpRequestAsync = async (url, data = {}, config = {}) => axios.post(url, data, config);