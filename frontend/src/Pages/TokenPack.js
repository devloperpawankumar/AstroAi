import React, { useState,useEffect } from "react";
import "../assets/css/TokenPack.css"; // Add this CSS file
import Vector from "../assets/images/Vector.png"
import BackButton from "../components/Backbutton";
import loadRazorpay from "../context/loadRazorpay";

const plans = {
  INR: [
    {
      title: "Seeker Light",
      subTitle:"Ask one accurate question",
      price: "₹99",
      per: "/10 Token",
      btnColor: "black",
      features: [
        "Get 10 Token Ideal for one-time curiosity",
        "Cost Just ₹9.90 per Token",
        "Instant Access",
        "Validity Lifetime",
        "No discount (Base pack)",
        "Secure & Private Conversations"
      ]
    },
    {
      title: "Moon Light",
      subTitle:"Regular seekers of guidance",
      price: "₹499",
      per: "/60 Token",
      btnColor: "#3f51b5",
      badge: "Save 16%",
      features: [
        "Unlock clarity with 6 questions at a discounted rate",
        "Cost Just ₹8.31 per Token",
        "Instant Access",
        "Validity Lifetime",
        "Priority Response time",
        "Secure & Private Conversations"
      ]
    },
    {
      title: "Cosmic Wisdom",
      subTitle:"Need consistent life guidance",
      price: "₹999",
      per: "/122 Token",
      btnColor: "black",
      badge: "Save 10%",
      features: [
        "Unlock clarity with 14 questions at a discounted rate",
        "Cost Just ₹8.19 per Token",
        "Instant Access",
        "Validity Lifetime",
        "Fastest Response time",
        "Secure & Private Conversations"
      ]
    }
  ],
  USD: [
    {
      title: "Seeker Light",
      subTitle:"Ask one accurate question",
      price: "$1.19",
      per: "/10 Token",
      btnColor: "black",
      features: [
        "Get 10 Token Ideal for one-time curiosity",
        "Cost Just $0.12 per Token",
        "Instant Access",
        "Validity Lifetime",
        "No discount (Base pack)",
        "Secure & Private Conversations"
      ]
    },
    {
      title: "Moon Light",
      subTitle:"Regular seekers of guidance",
      price: "$5.99",
      per: "/60 Token",
      btnColor: "#3f51b5",
      badge: "Save 16%",
      features: [
        "Unlock clarity with 6 questions at a discounted rate",
        "Cost Just $0.10 per Token",
        "Instant Access",
        "Validity Lifetime",
        "Priority Response time",
        "Secure & Private Conversations"
      ]
    },
    {
      title: "Cosmic Wisdom",
      subTitle:"Need consistent life guidance",
      price: "$11.99",
      per: "/122 Token",
      btnColor: "black",
      badge: "Save 10%",
      features: [
        "Unlock clarity with 14 questions at a discounted rate",
        "Cost Just $0.098 per Token",
        "Instant Access",
        "Validity Lifetime",
        "Fastest Response time",
        "Secure & Private Conversations"
      ]
    }
  ]
};

const TokenPack = () => {
  // useEffect(() => {
  //   const restoreScrollOnBack = () => {
  //     document.body.style.overflow = "auto";
  //     document.documentElement.style.overflow = "auto";
  //   };

  //   window.addEventListener("popstate", restoreScrollOnBack);

  //   return () => {
  //     window.removeEventListener("popstate", restoreScrollOnBack);
  //   };
  // }, []);
  const [currency, setCurrency] = useState("INR");

  return (
    <div className="token-pack-container">
      <BackButton bgcolor='#000' color='#fff'/>
      <h2 className="token-title">
        Select a <span className="highlight-token">Token</span> Pack to Unlock{" "}
        <span className="highlight-vedic">Vedic</span> Guidance
      </h2>

      <div className="currency-toggle">
        <div className="packtoggle">
        <span className={currency === "USD" ? "active" : ""}>USD US<i className='bx bx-dollar' style={{fontSize:20}}></i></span>
        <label className="switch">
          <input
            type="checkbox"
            checked={currency === "INR"}
            onChange={() => setCurrency(currency === "INR" ? "USD" : "INR")}
          />
          <span className="slider"></span>
        </label>
        <span className={currency === "INR" ? "active" : ""}>{"    "}INR IN₹</span>
        </div>
      </div>

      <div className="plans-container">
        {plans[currency].map((plan, index) => (
          <div key={index} className="plan-card">
            {plan.badge && <div className="badge">{plan.badge}</div>}
            <h3>{plan.title}</h3>
            <p className="planSubtitle">{plan.subTitle}</p>
            <p className="price">
              {plan.price}
              <span className="per">{plan.per}</span>
            </p>
            <button
              style={{ backgroundColor: plan.btnColor }}
              className="buy-button"
              onClick={() => {
                const numericAmount = parseFloat(plan.price.replace(/[^0-9.]/g, ''));
                loadRazorpay(numericAmount, plan.title);
              }}
            >
              Buy now
            </button>
            <div className="packlist">
                <h3>Features</h3>
            <ul className="features">
              {plan.features.map((f, i) => (
                <li key={i}><img src={Vector} alt="icon" width={14} height={14}/><p>{f}</p> </li>
              ))}
            </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenPack;