import axios from "axios";
import "dotenv/config";
const token = localStorage.getItem("token");

const baseURL = process.env.REACT_APP_API_URL;

export const service = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const ledgerAPI = {
  account: (data) => service.get(`/account/${data}`),
  accountCreate: (data) => service.post("/account/create", data),
  login: (data) => service.get("/account/login", data),
  update: (data) => service.put(`account/update/${data}`, data),
};

// export { ledgerAPI };
