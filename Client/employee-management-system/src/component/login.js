// Login.js
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username, // Assuming your server expects 'email' instead of 'username'
      password: password,
    };

    try {
      const result = await axios.post("http://localhost:3001/login", userData);
      console.log(result);

      // Assuming your server returns a token upon successful login
      // You can save the token in localStorage or a state management solution
      // For simplicity, I'm assuming a token is available in result.data.token
      const token = result.data.token;

      // Save the token to localStorage
      localStorage.setItem("token", token);

      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);

      // You can customize the error handling based on the error status
      if (err.response && err.response.status === 401) {
        console.error("Unauthorized: Invalid credentials");
        // Handle invalid credentials error
      } else {
        console.error("Unexpected error:", err.message);
        // Handle other errors
      }
    }
  };

  return (
    <div className="main">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          UserName:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
