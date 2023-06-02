import { axiosInstance } from "../config/axios";

function login(data: { email: string; password: string }) {
  return axiosInstance.post("/user/login", data);
}

function getMe() {
  return axiosInstance.post("/me");
}

export { login, getMe };
