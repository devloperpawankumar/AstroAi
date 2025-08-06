import React, { useEffect, useState } from "react";
import "../assets/css/SignupForm.css";
import Image from "../assets/images/ddf 1.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import api from "../api/axios";

const SignupForm = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Extract token from localStorage or URL params
    const params = new URLSearchParams(window.location.search);
    let token = localStorage.getItem("token") || params.get("token");
  
    if (token) {
      
      try {
        const decoded = jwtDecode(token);
        const id = decoded.email; // Ensure `id` exists in the token
        if (!id) {
          setError("Invalid token, no user ID found.");
          return;
        }
        setUserId(id);
  
        // Fetch user details
        axios
          .get(`${api}/user/details/${id}`)
          .then((res) => {
            setEmail(res.data[0].email);
            setName(res.data[0].name);
          })
          .catch((err) => {
            setError("Failed to fetch user details. Please try again.");
            console.error("Failed to fetch user email:", err);
          });
      } catch (error) {
        setError("Invalid token.");
        console.error("JWT Decode Error:", error);
      }
    } else {
      setError("Token missing. Please try again.");
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(`${api}/user/signup/${userId}`, {
        name,
        password,
      });

      console.log("✅ Signup details updated successfully!");
      window.location.href = "/detail";
      console.log(res.data);
    } catch (err) {
      const msg = err.response?.data?.msg || "Signup failed. Please try again.";
      setError(msg);
      console.error("❌ Failed to update user:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-section">
        <h1>Sign up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group1 floating-label1">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-group1 floating-label1">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
              readOnly
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-group1 floating-label1">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-group1 floating-label1">
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree">
              I’ve read and agree with the Terms and Service and our{" "}
              <span className="privacy-policy">Privacy Policy</span>
            </label>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>

      <div className="image-section">
        <img src={Image} alt="signup" />
      </div>
    </div>
  );
};

export default SignupForm;
