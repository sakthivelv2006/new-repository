import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  experience: { type: String, required: true },
  phone: { type: String, required: true },
  roll: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
