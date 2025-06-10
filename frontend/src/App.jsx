import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import userRegister from "./store/store.userregister.js"; // Import API handler
import videoSrc from "./assets/registervideo1.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (isRegister) {
        response = await userRegister.registerUser(formData);
        console.log("Registration Response:", response); // Debugging log
      
        if (response && response.success) {
          toast.success("Registered successfully!");
        } else {
          throw new Error(response.message || "Registration failed");
        }
      }
      else {
        response = await userRegister.loginUser(formData);
        console.log("Login Response:", response); // Debugging log
        console.log("user id", response.user.id);
  
        if (response && response.user) {
          localStorage.setItem("userId", response.user.id);
          localStorage.setItem("userName", response.user.name);
          localStorage.setItem("userEmail", response.user.email);
          localStorage.setItem("userPassword", response.user.password);
          localStorage.setItem("loggedIn", "true");
          toast.success("Login successful!"); // This will show a green toast
          navigate("/home");
        } else {
          
          throw new Error(response.message || "Invalid response from server");
        }
      }
    } catch (error) {
      navigate("/home");
      toast.error(error.message); // This will show a red toast for errors
      navigate("/home");
    
    }
  };
  

  return (
    <div className="position-relative vh-100 vw-100 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <video autoPlay loop muted className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100 h-100">
        <div className="card p-4 shadow-lg rounded-4 bg-light bg-opacity-75 w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center text-primary mb-3">{isRegister ? "Register" : "Login"}</h2>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control rounded-end"
                    required
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control rounded-end"
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control rounded-end"
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold rounded-3">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              {isRegister ? "Already have an account?" : "Don't have an account?"}
              <button
                className="btn btn-link fw-semibold text-decoration-none"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
