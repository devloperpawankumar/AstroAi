import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import "../assets/css/resetpassword.css";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate("")
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(`${api}/auth/reset-password`, { token, password });
      setMessage(response.data.msg);
        navigate("/login")
    } catch (err) {
      setMessage('Error resetting password.');
    }
  };

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or expired token.');
    }
  }, [token]);

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2 className="reset-password-title">Reset Password</h2>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="form-group floating-label">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label>New Password</label>
          </div>

          <div className="form-group floating-label">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label>Confirm Password</label>
          </div>

          <button className="reset-button" type="submit">Reset Password</button>
        </form>

        {message && <p className="message-text">{message}</p>}

        <div className="footer-links">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
