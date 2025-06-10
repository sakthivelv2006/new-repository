import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Booking from "./Booking";
import userBooking from "../store/store.userBooking.js";
import homepagevideo from "../assets/homepagevideo1.mp4";

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn) {
      setUserId(storedUserId);
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
      setLoggedIn(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleShowBookings = async () => {
    try {
      if (userId) {
        const response = await userBooking.getBookingDetailsByUserId(userId);
        if (response?.success && Array.isArray(response.bookings)) {
          setBookingDetails(response.bookings);
          setShowBookingPopup(true);
        } else {
          alert("Failed to fetch booking details. Try again.");
        }
      }
    } catch (error) {
      alert("An error occurred while fetching booking details.");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="d-flex flex-column vh-100 position-relative">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <i className="bi bi-house-door-fill me-2"></i> SIVANE THUNAI TOURS AND TRAVELS
          </a>

          {/* Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              onClick={toggleDropdown}
            >
              <i className="bi bi-list"></i> BOOKING CLICK HERE
            </button>
            {isDropdownOpen && (
              <ul
                className="dropdown-menu d-flex flex-row flex-wrap p-2"
                aria-labelledby="dropdownMenuButton"
                style={{ minWidth: "300px" }}
              >
                <li className="flex-grow-1 me-2 mb-2">
                  <button
                    className="dropdown-item w-100 text-start"
                    onClick={() => {
                      setShowBooking(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <i className="bi bi-calendar-check me-2"></i> Booking
                  </button>
                </li>
                <li className="flex-grow-1 mb-2">
                  <button
                    className="dropdown-item w-100 text-start"
                    onClick={() => {
                      handleShowBookings();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <i className="bi bi-journal-text me-2"></i> Get All Booking Details
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Right */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light border-0"
                  onClick={() => setShowProfilePopup(true)}
                >
                  <i className="bi bi-person-circle me-2"></i> Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light border-0"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Background Video */}
      <div className="position-relative vh-100 vw-100 overflow-hidden">
        <video
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          autoPlay
          muted
          loop
        >
          <source src={homepagevideo} type="video/mp4" />
        </video>
     <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center text-white bg-dark bg-opacity-50">
  <h2 className="mt-4">Welcome To Raja Welding And</h2>
  {loggedIn && <p className="lead">{userName}</p>}

  {/* Job Alert 1 */}
  <div className="mt-3 p-3 bg-warning text-dark rounded shadow-sm">
    <strong>Job Alert:</strong><br />
    Shri Amman Hydraulics Service & Welding Work, Sathyamangalam<br />
    <strong>Contact:</strong> Raja JCB – 9080040143
  </div>

  {/* Job Alert 2 - Earth Movers */}
  <div className="mt-3 p-3 bg-info text-dark rounded shadow-sm">
    <strong>Earth Movers Services Available:</strong><br />
    ✦ JCB Machine Hire & Repair<br />
    ✦ Hitachi Excavators Maintenance<br />
    ✦ Hydraulic Pump & Cylinder Services<br />
    ✦ On-site Heavy Welding Work<br />
    ✦ Full Earthmoving Equipment Support<br />
    <strong>Contact:</strong> Mr. Raja – 9080040143
  </div>
</div>


      </div>

      {/* Booking Component */}
      {showBooking && (
        <Booking userId={userId} onClose={() => setShowBooking(false)} />
      )}

      {/* Booking Popup */}
      {showBookingPopup && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-journal-text me-2"></i> Booking Details
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowBookingPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                {bookingDetails.length > 0 ? (
                  bookingDetails.map((booking, index) => (
                    <div key={index} className="mb-3">
                      <table className="table table-striped table-hover table-bordered text-center">
                        <thead className="table-dark">
                          <tr>
                            <th>Field</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="bg-primary text-white">From</th>
                            <td>{booking.from}</td>
                          </tr>
                          <tr>
                            <th className="bg-primary text-white">To</th>
                            <td>{booking.destination}</td>
                          </tr>
                          <tr>
                            <th className="bg-primary text-white">Date</th>
                            <td>{booking.date}</td>
                          </tr>
                          <tr>
                            <th className="bg-primary text-white">Phone</th>
                            <td>{booking.phone}</td>
                          </tr>
                          <tr>
                            <th className="bg-primary text-white">Members</th>
                            <td>{booking.members}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))
                ) : (
                  <p>No bookings found.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowBookingPopup(false)}
                >
                  <i className="bi bi-x-circle me-2"></i> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Popup */}
      {showProfilePopup && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-circle me-2"></i> Profile
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowProfilePopup(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p><strong>Name:</strong> {userName}</p>
                <p><strong>Email:</strong> {userEmail}</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button className="btn btn-danger" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
                <button className="btn btn-secondary" onClick={() => setShowProfilePopup(false)}>
                  <i className="bi bi-x-circle me-2"></i> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-auto w-100">
        &copy; 2025 MyApp. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
