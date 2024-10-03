import axiosInstance from "../services/axiosInterceptor";

// Register API call Axios instance
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data", // If you are sending form data
      },
    });
    return response;
  } catch (error) {
    console.log("Failed to register user", error);
    throw error; // Handle error accordingly
  }
};

// Login API call Axios instance
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to login user", error);
    throw error; // Handle error accordingly
  }
};
