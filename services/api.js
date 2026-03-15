import axios from "axios";

const API = axios.create({
  baseURL: "https://yourdomain.com/api", // your backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;