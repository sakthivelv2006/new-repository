import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BsCalendar, BsTelephone, BsPeople, BsGeoAlt } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import userBooking from "../store/store.userBooking.js";

function Booking({ userId, onClose }) {
  const [formData, setFormData] = useState({
    from: "",
    date: "",
    destination: "",
    phone: "",
    members: "",
  });
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) return;
      setPhoneError(value.length === 10 ? "" : "Phone number must be 10 digits");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    const bookingData = { ...formData, userId };

    try {
      const result = await userBooking.registerUser(bookingData);

      if (result.success) {
        toast.success("Booking Successful!", { position: "top-right", autoClose: 3000 });
        onClose();
      } else {
        toast.error(result.message, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Booking failed! Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: "450px" }}>
        <h5 className="text-center mb-4">
          <BsGeoAlt className="me-2 text-primary" /> Booking Form
        </h5>

        <form onSubmit={handleSubmit} className="small">
          <div className="mb-3">
            <label className="form-label fw-bold">
              <FaMapMarkerAlt className="me-2 text-secondary" /> From Place
            </label>
            <input
              type="text"
              className="form-control"
              name="from"
              placeholder="Enter starting place"
              value={formData.from}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              <BsCalendar className="me-2 text-secondary" /> Date
            </label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              <FaMapMarkerAlt className="me-2 text-secondary" /> Destination
            </label>
            <input
              type="text"
              className="form-control"
              name="destination"
              placeholder="Enter destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              <BsTelephone className="me-2 text-secondary" /> Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {phoneError && <small className="text-danger">{phoneError}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              <BsPeople className="me-2 text-secondary" /> Number of Members
            </label>
            <input
              type="number"
              className="form-control"
              name="members"
              placeholder="Enter number of members"
              value={formData.members}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
            <button type="submit" className="btn btn-success w-100 w-md-50 me-md-2 mb-2 mb-md-0">
              <i className="bi bi-check-circle me-2"></i> Book Now
            </button>
            <button type="button" className="btn btn-danger w-100 w-md-50" onClick={onClose}>
              <i className="bi bi-x-circle me-2"></i> Close
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Booking;
