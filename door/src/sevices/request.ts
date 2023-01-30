import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

type UserType = {
  username: String;
  password: String;
};
const { VITE_API_URL } = import.meta.env;
const registerRequest = axios.create({
  baseURL: VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export const requestWithConfig = (data: UserType) => {
  console.log(VITE_API_URL);
  return new Promise((resolve, reject) => {
    registerRequest
      .post("/login-user", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject({ state: "error" });
      });
  });
};
