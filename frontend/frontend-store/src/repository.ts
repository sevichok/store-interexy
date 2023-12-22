import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const repository = axios.create({
  baseURL: REACT_APP_API_URL,
  // withCredentials: true,
});

repository.interceptors.request.use((config) => {

  const access_token = sessionStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

export default repository;
