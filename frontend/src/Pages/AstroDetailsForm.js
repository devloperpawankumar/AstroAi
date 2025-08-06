import React, { useEffect, useState } from "react";
import "../assets/css/AstroDetailsForm.css";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";

const AstroDetailsForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [showData,setShowData]= useState(false)
  const [formData, setFormData] = useState({
    dob: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });

  useEffect(()=>{
    setTimeout(()=>{
      setShowData(true)
    },2000)
  },[])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let token = localStorage.getItem("token") || params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const id = decoded.email;
      setUserId(id);

      axios
        .get(`${api}/user/details/${id}`)
        .then((res) => {
          setEmail(res.data[0].email);
          setName(res.data[0].name);
          // If user already filled details, skip form
          if (res.data[0].placeOfBirth) {
            
            localStorage.setItem("islogin", true);
            window.location.href = "/welcome";
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user details:", err);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`${api}/user/details/${userId}`, formData);
      localStorage.setItem("islogin", true);
      window.location.href = "/welcome";
    } catch (err) {
      const msg = err.response?.data?.msg || "Signup failed. Please try again.";
      setError(msg);
      console.error("Error saving details:", err);
    }
  };

  return showData && (
    <>
      <Navbar text={email.charAt(0).toUpperCase()} />
      <div className="astro-container">
        <div className="astro-content">
          <h1>
            We need some Details <span className="emoji">😊</span>
          </h1>
          <p>
            Accurate <span className="highlight">Time</span> helps us to provide accurate Predictions
          </p>

          <form className="astro-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group floating-label">
                <input type="text" name="name" value={name} disabled readOnly />
                <label>Name</label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group floating-label">
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                <label>D.O.B (DD/MM/YYYY)</label>
              </div>

              <div className="form-group floating-label">
                <input
                  type="time"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleChange}
                  required
                />
                <label>Time of Birth (H:M AM/PM)</label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group floating-label full-width">
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="input-clean"
                />
                <label>Place of Birth</label>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="form-footer">
              <button type="submit" className="submit-button">
                <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AstroDetailsForm;
