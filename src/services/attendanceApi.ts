import { api } from "./api";

export const getAttendanceApi = async (token: string) => {
  const response = await api.get("/attendance.php", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};