import axios from "axios";

//direct use in the controller frontend..
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;