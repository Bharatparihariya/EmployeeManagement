import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State variables to hold user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the user data
    const userData = {
      username: username,
      email: email,
      password: password,
      role: role,
    };

    axios
      .post("http://localhost:3001/signup", userData)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="radio-group">
          <p>Select your role:</p>
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="manager"
                name="role"
                value="manager"
                checked={role === "manager"}
                onChange={() => setRole("manager")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Manager
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="employee"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={() => setRole("employee")}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Employee
              </label>
            </div>
          </div>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
