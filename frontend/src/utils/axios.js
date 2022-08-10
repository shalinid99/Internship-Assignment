import axios from "axios";
import store from "../store";

export const getApi = () => {
  const newState = store.getState();
  const token = newState ? newState.auth.token : null;
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token ? "Bearer " + token : null,
      "Content-type": "application/json",
    },
  });
};
