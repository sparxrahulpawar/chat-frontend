export const isAuthenticated = () => {
    // Check for a valid token in local storage
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  };
  