// store.userBooking.js
import axios from "axios";

const API_URL = "https://sivanethunaibackend-1.onrender.com/api/users/book"; // Adjusted to match your backend route

const userBooking = {
  registerUser: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/booking`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Booking failed",
      };
    }
  },

  getBookingDetailsByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/booking/${userId}`); // Adjusted route
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch user bookings",
      };
    }
  },
};

export default userBooking;
