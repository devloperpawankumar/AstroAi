import React, { useState } from 'react';
import axios from 'axios';
import api from '../api/axios';
import "../assets/css/forgetpassword.css";

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api}/auth/forgot-password`, { email });
      setMessage(response.data.msg);
    } catch (err) {
      setMessage('Error sending reset email.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group floating-label">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label>Email</label>
          </div>

          <button className="forget-button " type="submit">Send Reset Link</button>
        </form>

        {message && <p className="message-text">{message}</p>}

        <div className="footer-links">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
