import axiosInstance from "../services/axiosInterceptor";

// Get messages of specific user API call Axios instance
export const getMessagesByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/message/${userId}`, {
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
