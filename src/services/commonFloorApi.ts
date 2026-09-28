import { api } from "./api";

export const getCommonFloorApi = async (
  token: string
) => {
  console.log("=================================");
  console.log("COMMON FLOOR API REQUEST");
  console.log(
    "URL:",
    `${api.defaults.baseURL}/commonfloor.php`
  );

  try {
    const response = await api.get(
      "/commonfloor.php",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "COMMON FLOOR STATUS:",
      response.status
    );

    console.log(
      "COMMON FLOOR RESPONSE:",
      response.data
    );

    console.log("=================================");

    return response.data;
  } catch (error: any) {
    console.log("=================================");
    console.log("COMMON FLOOR API ERROR");

    console.log(
      "URL:",
      `${error?.config?.baseURL ?? ""}${
        error?.config?.url ?? ""
      }`
    );

    console.log(
      "STATUS:",
      error?.response?.status
    );

    console.log(
      "RESPONSE:",
      error?.response?.data
    );

    console.log("=================================");

    throw error;
  }
};


export const sendCommonFloorApi = async (
  token: string,
  message: string
) => {
  const response = await api.post(
    "/commonfloor.php",
    {
      message,
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