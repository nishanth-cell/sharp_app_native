import axios from "axios"; 
export const api = axios.create(
  { baseURL: "http://10.248.172.25/backend/api", 
    headers: { "Content-Type": "application/json",

     }, 
});