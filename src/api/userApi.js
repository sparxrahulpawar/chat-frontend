import axiosInstance from "../services/axiosInterceptor";

// Get users API call Axios instance
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Failed to fetch user", error);
    throw error;
  }
};
