import React, { useState } from "react";
import "../assets/css/signup.css";
import { FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa";
import MiddleLine from "../assets/images/mid partition.png";
import AppleIcon from "../assets/images/apple white.png";
import GoogleIcon from "../assets/images/google.png";
import MicrosoftIcon from "../assets/images/ms.png";
import Navbar from "../components/Navbar";
import axios from "axios";
import api from "../api/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
 const res = await axios.post(
  `${api}/auth/signup`,   // ← this now goes to backend
  { email },
  { withCredentials: true }
);

      // Store token in localStorage (or cookies if preferred)
      localStorage.setItem("token", res.data.token);

      // Redirect to details page
      alert("Email Verification link is send on you email? please verify it")
      // window.location.href = `/verify?token=${res.data.token}`;
    } catch (err) {
      const msg = err.response?.data?.msg || "Signup failed. Please try again.";
      setError(msg);
      console.error("❌ Signup failed:", err.response?.data?.msg || err.message);
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className="signup">
      <div className="signup-cont">
        <div className="signupLeft-cont">
          <h1>Create an Account</h1>
          <p>
            Already have an account{" "}
            <Link className="login-link" to="/login">Login </Link>
          </p>
          <div className="form-1">
  <div className="form-group floating-label full-width" >
    <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} required />
    <label>Email address*</label>
  </div>
{error && <div className="error-message">{error}</div>}
</div>
          <button className="continue-button" onClick={handleSignup}>Continue</button>
        </div>
        <div className="SignupMidle-cont">
          <img src={MiddleLine} alt="bodrder icon" />
        </div>
        <div className="signupRight-cont">
          <button className="social-button" onClick={() => window.location.href = `${api}/auth/google`}>
            {/* <FaApple className="icon" /> */}
            <img src={AppleIcon} alt="icon" />
            Continue with Apple
          </button>
          <button className="social-button" onClick={() => window.location.href = `${api}/auth/google`}>
            {/* <FaGoogle className="icon" /> */}
            <img src={GoogleIcon} alt="icon" />
            Continue with Google
          </button>
          <button className="social-button" onClick={() => window.location.href = `${api}/auth/microsoft`}>
            {/* <FaMicrosoft className="icon" /> */}
            <img src={MicrosoftIcon} alt="icon" />
            Continue with Microsoft
          </button>
        </div>
      </div>
      <div className="signup-footer">
        <a href="javascript:void(0)">Terms of Use</a>
        <a href="javascript:void(0)">Privacy Policy</a>
      </div>
    </div>
    </>
  );
};

export default Signup;
