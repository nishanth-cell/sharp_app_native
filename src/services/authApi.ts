import { api } from "./api"; 
import type { LoginResponse } from "../../types/auth"; 
export const loginApi = async ( username: string, password: string ): 
Promise<LoginResponse> => 
  { const response = await api.post<LoginResponse>( "/auth/login.php", 
    { username, password, } ); 
    return response.data; 
  };

  export const logoutApi = async () => {
  const response = await api.post("/auth/logout.php");

  return response.data;
};