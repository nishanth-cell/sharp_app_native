import axios from "axios"; 
export const api = axios.create(
  { baseURL: "http://192.168.0.207/backend/api", 
    headers: { "Content-Type": "application/json",

     }, 
});