import axios from "axios";
import AuthService from "./services/auth.service";

const API_URL = "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.accessToken) {
      config.headers["Authorization"] = `Bearer ${currentUser.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
