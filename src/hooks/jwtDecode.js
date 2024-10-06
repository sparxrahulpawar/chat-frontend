import {jwtDecode} from "jwt-decode";

export const getUsernameFromToken = () => {
  const token = localStorage.getItem("token"); // Adjust the key if necessary
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.username; // Adjust according to your token structure
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; // or return a default username
    }
  }
  return null; // No token found
};
