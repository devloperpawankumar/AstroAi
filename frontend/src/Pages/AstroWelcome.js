import React, { useEffect, useState } from "react";
import "../assets/css/AstroWelcomePage.css";
import IconImage1 from "../assets/images/LOVE.png"
import IconImage3 from "../assets/images/g7686.png"
import IconImage2 from "../assets/images/wealth.png"
import IconImage4 from "../assets/images/icon.svg (2).png"
import { useNavigate } from "react-router-dom";
import WelcomeNavbar from "../components/WelcomeNavbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import api from "../api/axios";
const cards = [
  {
    title: "Marriage & Love",
    color: "#ef476f",
    lightColor: "#fcd2db",
    emoji: "❤️",
    image: IconImage1, // Replace with an icon or img
  },
  {
    title: "Career",
    color: "#00b4d8",
    lightColor: "#d0f1fb",
    emoji: "💼",
    image: IconImage3, // Replace with an icon or img
  },
  {
    title: "Wealth & Finances",
    color: "#ff8800",
    lightColor: "#ffe5cc",
    emoji: "💰",
    image: IconImage2, // Replace with an icon or img
  },
  {
    title: "Foreign Education",
    color: "#2e8b57",
    lightColor: "#e3fce7",
    emoji: "📚",
    image: IconImage4, // Replace with an icon or img
  },
];

const AstroWelcome = () => {
  const [email, setEmail] = useState("")
  const [showData,setData]= useState(false)
  
   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const id = decoded.email;
  
        axios
          .get(`${api}/user/details/${id}`)
          .then((res) => {
            setEmail(res.data[0].email);
          })
          .catch((err) => {
            console.error("Failed to fetch user email:", err);
          });
      }
    }, []);
  const navigate = useNavigate()
  return (
    <>
    <WelcomeNavbar text={email.charAt(0).toUpperCase()}/>
    <div className="astro-wrapper">
      {/* <header className="astro-header">
        <div className="logo">🔮 Astro Ai</div>
        <div className="profile-badge">J</div>
      </header> */}

      <div className="welcome-text">
        <h1>Welcome to Astro Ai</h1>
        <p>We Specialise in Giving you Accurate Prediction</p>
      </div>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="astro-card"
            style={{ backgroundColor: card.color }}
          >
            <div className="card-header">
              <span className="card-emoji">{card.emoji}</span>
              <h3>{card.title}</h3>
            </div>
            <div
              className="card-content"
              style={{ backgroundColor: card.lightColor }}
            >
              <span className="card-icon"><img src={card.image} alt="icon"/></span>
            </div>
          </div>
        ))}
      </div>
        <div className="skipbtn">
      <div className="skip-button" onClick={()=>navigate("/chat")}>Skip</div>
        </div>
    </div>
    </>
  );
};

export default AstroWelcome;
