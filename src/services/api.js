import axios from "axios";

const api = axios.create({
  baseURL: "https://server-back-cofh.onrender.com/api"
});

export default api;
