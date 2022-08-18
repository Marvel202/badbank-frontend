import axios from "axios";

const token = localStorage.getItem("token");

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3003";

const service = axios.create({
  baseURL: "http://localhost:3003",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const ledgerAPI = {
  balance: (data) => service.get(`/account/${data.email}`, data),
  account: (data) =>
    service.get(`http://localhost:3003/account/${data.email}`, data),
  accountCreate: (data) => service.post("/account/create", data),
  login: (data) => service.get("/account/login", data),
  update: (data) => service.get(`account/update/${data.email}`, data),
};

export { ledgerAPI };
