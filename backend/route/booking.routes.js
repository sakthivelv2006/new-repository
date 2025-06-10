import express from "express";
import { createBooking, getUserBookings, getBookingById, deleteBooking } from "../controller/booking.controller.js";

const router = express.Router();

// Create a new booking
router.post("/booking", createBooking);

// Get all bookings for a user
router.get("/booking/:userId", getUserBookings);

// Get a specific booking by ID
router.get("/booking/detail/:id", getBookingById);

// Delete a booking
router.delete("/booking/:id", deleteBooking);

export default router;
