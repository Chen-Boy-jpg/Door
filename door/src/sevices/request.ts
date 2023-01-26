import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

type UserType = {
  username: String;
  password: String;
};
const registerRequest = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export const requestWithConfig = (data: UserType) => {
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
