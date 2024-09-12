import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css"; // Import CSS file for styling

const SignupAgent = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState(""); // Set team as an empty string initially
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [admins, setAdmins] = useState([]); // State to hold admin names
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admin names when the component mounts
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("https://trcnxf.com/api/admins");
        setAdmins(response.data); // Save the admins to state
      } catch (error) {
        console.error("Error fetching admins", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== reenterPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://trcnxf.com/api/agent/signup", {
        name,
        team,
        password,
      });
      console.log(response.data); // Handle signup success
    } catch (error) {
      console.error(error.response.data); // Handle signup error
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Team (Select Admin):</label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          >
            <option value="">Select Admin</option>
            {admins.map((admin) => (
              <option key={admin._id} value={admin.name}>
                {admin.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>Re-enter Password:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showReenterPassword ? "text" : "password"}
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowReenterPassword(!showReenterPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <i
                className={
                  showReenterPassword ? "fas fa-eye-slash" : "fas fa-eye"
                }
              />
            </span>
          </div>
        </div>
        <button type="submit" className="btn">
          Signup
        </button>
      </form>

      {/* Redirect to Login */}
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/agentLogin")}
          className="btn-link"
          style={{ color: "blue" }}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupAgent;
