import axios from "axios";

export const api = axios.create({
//   baseURL: "https://fullstack-node-render.onrender.com",
  baseURL: "http://localhost:3000",
  timeout: 8 * 1000,
});
