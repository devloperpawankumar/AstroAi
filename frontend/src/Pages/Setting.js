import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import '../assets/css/setting.css';
import SettingImage from '../assets/images/setting.png';
import api from '../api/axios';
import BackButton from '../components/Backbutton';

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });
    const [userId, setUserId] = useState("");
    const [error,setError]= useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.email;
        setUserId(id)
        axios.get(`${api}/user/details/${id}`)
          .then((res) => {
            if (res.data) {
                console.log(res.data)
              setFormData({
                name: res.data[0].name || '',
                dob: res.data[0].dob || '',
                timeOfBirth: res.data[0].timeOfBirth || '',
                placeOfBirth: res.data[0].placeOfBirth || '',
              });
            }
          })
          .catch((err) => {
            console.error("Failed to fetch user details:", err);
          });
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${api}/user/userdetail/${userId}`, formData);
      console.log("Details saved!", res.data);
    } catch (err) {
      const msg = err.response?.data?.msg || "Signup failed. Please try again.";
      setError(msg);
      console.error("Error saving details:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <>
    <BackButton bgcolor='#000' color='#fff'/>
    <div className="settings-container">
      
      <div className="form-section">
        <h1>My Settings</h1>
        <form className="settings-form" onSubmit={handleSubmit}>
          {["name", "dob", "timeOfBirth", "placeOfBirth"].map((field) => (
            <div className="floating-label1" key={field}>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>{field === "dob" ? "Date of Birth" :
                      field === "timeOfBirth" ? "Time of Birth" :
                      field === "placeOfBirth" ? "Place of Birth" :
                      "Name"}</label>
            </div>
          ))}
            {error && <div className="error-message">{error}</div>}
          <button className="save-btn" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="image-section1">
        <img src={SettingImage} alt="Astrology" />
        <p className="info-text">
          <strong>How we are Different</strong>
          <span className="tooltip">?</span>
        </p>
      </div>
    </div>
    </>
  );
};

export default SettingsForm;
