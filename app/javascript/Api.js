import axios from "axios";

const fetchTokenFromStorage = () => localStorage.getItem("msgo_token");

const Api = axios.create({
  headers: {
    Authorization: `Bearer ${fetchTokenFromStorage()}`,
    "Content-Type": "application/json",
  },
});

export const fetchContractors = (params) => {
  return Api.get("/api/v1/contractors");
};

export const fetchCollection = (model, params) =>
  Api.get(`/api/v1/${model}`, { params });

export const fetchOne = (model, id, params = {}) => {
  return Api.get(`/api/v1/${model}/${id}`, { params });
};

export const fetchContractor = (id) => Api.get("/api/v1/contractors/" + id);

export const fetchAttendances = (params = {}) => () =>
  Api.get("/api/v1/attendances", params);

export const fetchPayrolls = (params = {}) => () =>
  Api.get("/api/v1/payrolls", params);

export default Api;
