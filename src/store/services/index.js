import axios from "axios";

import store from "../";
import config from "../../config";

export default () => {
  if (store.getState().login.data) {
    return axios.create({
      baseURL: config("api"),
      headers: {
        Authorization: `Bearer ${store.getState().login.data.access_token}`
      }
    });
  } else {
    return axios.create({ baseURL: config("api") });
  }
};