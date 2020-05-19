import axios from "axios";
import qs from "qs";

const fetchTokenFromStorage = () => localStorage.getItem("msgo_token");

const getAxiosInstance = () => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${fetchTokenFromStorage()}`,
      "Content-Type": "application/json",
    },
    paramsSerializer: (params) => qs.stringify(params),
  });
};

export const fetchContractors = () => {
  return getAxiosInstance().get("/api/v1/contractors");
};

export const fetchCollection = (model, params) =>
  getAxiosInstance().get(`/api/v1/${model}`, { params });

export const fetchOne = (model, id, params = {}) => {
  return getAxiosInstance().get(`/api/v1/${model}/${id}`, { params });
};

export default getAxiosInstance();
