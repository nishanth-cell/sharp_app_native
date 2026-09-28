import { api } from "./api";

export const getPeopleApi = async (
  token: string,
  role?: string,
  query?: string
) => {
  const params = {
    ...(role && role !== "All"
      ? { role: role.toLowerCase() }
      : {}),
    ...(query?.trim()
      ? { q: query.trim() }
      : {}),
  };

  console.log("=================================");
  console.log("PEOPLE API REQUEST");
  console.log("Base URL:", api.defaults.baseURL);
  console.log("Endpoint:", "/users.php");
  console.log("Params:", params);

  try {
    const response = await api.get("/users.php", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    console.log("PEOPLE API URL:", response.config.url);
    console.log(
      "PEOPLE API FULL URL:",
      `${response.config.baseURL}${response.config.url}`
    );
    console.log("PEOPLE API STATUS:", response.status);
    console.log("PEOPLE API RESPONSE:", response.data);
    console.log("=================================");

    return response.data;
  } catch (error: any) {
    console.log("=================================");
    console.log("PEOPLE API ERROR");

    console.log(
      "ERROR URL:",
      error?.config?.url
    );

    console.log(
      "ERROR FULL URL:",
      `${error?.config?.baseURL ?? ""}${error?.config?.url ?? ""}`
    );

    console.log(
      "ERROR RESPONSE:",
      error?.response?.data
    );

    console.log(
      "ERROR STATUS:",
      error?.response?.status
    );

    console.log("=================================");

    throw error;
  }
};