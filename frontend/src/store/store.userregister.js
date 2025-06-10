import axios from "axios";

const API_URL = "https://sivanethunaibackend-1.onrender.com/api/users";

const userRegister = {
  registerUser: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  loginUser: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Login Response:", response.data); // Debugging log
  
      return response.data; // Make sure this contains user details
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  
};

export default userRegister;
