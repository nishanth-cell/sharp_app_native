import { api } from "./api"; 
import type { LoginResponse } from "../types/auth"; 
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



export const changePasswordApi = async (
  token: string,
  currentPassword: string,
  newPassword: string
) => {
  const response = await api.post(
    "/auth/change_password.php",
    {
      current_password: currentPassword,
      new_password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
