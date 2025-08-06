import React, { useState } from "react";
import "../assets/css/chartdetails.css";
import TaurusIcon from "../assets/images/taurus.png";
import D1ChartImage from "../assets/images/chart natal display.png";
import BackButton from "../components/Backbutton";

const horoscopeTexts = {
  Daily:
    "Today’s perfect for expressing your true feelings or making convincing pleas. It’s much easier than usual to persuade people you’re right, so try to reach the people who need to change their minds. Find out how you and your partner rate with the ultimate compatibility report, your Love Score.",
  Weekly:
    "This week is all about personal growth and clear communication. Take time to reflect on recent decisions and plan your next move. Important conversations could bring clarity in relationships.",
  Monthly:
    "This month encourages long-term planning and commitment. Whether it's career or love, it's time to make decisions that support your bigger picture. Don't hesitate to dream big and act boldly.",
};

const ChartDetails = () => {
  const [activeTab, setActiveTab] = useState("Daily");

  return (
    <>
    <BackButton bgcolor='#fff' color='#000'/>
    <div className="chart-container1">
      <section className="chart-section">
        <div className="chart-info">
          <h2>Your Chart Details</h2>
          <p>
            Rising sign is <span className="highlight">Tauras</span>
          </p>
          <p>
            Moon sign is <span className="highlight">Libra</span>
          </p>
        </div>
        <div className="chart-box">
          <img src={D1ChartImage} alt="Birth chart" />
        </div>
      </section>

      <section className="horoscope-section">
        <div className="horoscope-text">
          <h2>Horoscope</h2>
          <div className="tabs">
            {["Daily", "Weekly", "Monthly"].map((tab) => (
              <span
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
          <p className="daily-text">{horoscopeTexts[activeTab]}</p>
        </div>
        <div className="horoscope-icon">
          <img src={TaurusIcon} alt="Taurus" />
          {/* <p>Taurus</p> */}
        </div>
      </section>
    </div>
    </>
  );
};

export default ChartDetails;
