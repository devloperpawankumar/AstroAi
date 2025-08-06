import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Backbutton.css"; // Import your custom CSS
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton({ bgcolor ,color}) {
  const navigate = useNavigate();

  return (
    <button className="custom-back-button" onClick={() => navigate("/chat")} style={{backgroundColor:bgcolor, color:color}}>
      <FaArrowLeft/> Back
    </button>
  );
}
