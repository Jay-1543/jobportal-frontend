import axios from "axios";

const API = axios.create({
  baseURL: "https://YOUR-RAILWAY-BACKEND.up.railway.app"
});

export default API;