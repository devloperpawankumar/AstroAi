import React, { useState } from 'react';
import '../assets/css/ideawhattoask.css';
import { useNavigate } from 'react-router-dom';

const tabs = ['Marriage', 'Finance', 'Health', 'Career', 'Foreign Education'];

const questions = {
  Marriage: Array(9).fill('When will I get married ?'),
  Finance: Array(9).fill('How will I grow my finances ?'),
  Health: Array(9).fill('How to maintain good health ?'),
  Career: Array(9).fill('Will I be successful in my career ?'),
  'Foreign Education': Array(9).fill('Can I study abroad ?'),
};

const faqs = Array(8).fill({
  question: 'How will I purchase tokens and what is the validity',
  answer:
    'You can simply purchase by your own website setting billing option or simply click on in dialoguebox',
});

export default function IdeaWhatToAsk() {
  const [activeTab, setActiveTab] = useState('Marriage');
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="breadcrumb" onClick={()=>navigate("/chat")}>Home &gt; Astro Questions</div>
      <h2 className="main-title">Pre Asked Questions</h2>
      <p className="subtitle">Browse our Pre asked Questions</p>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="questions-grid">
        {questions[activeTab].map((q, index) => (
          <div key={index} className="question-card">
            {q} <span className="arrow"><i class='bx bx-chevron-right' style={{fontSize:20}}></i></span>
          </div>
        ))}
      </div>

      <div className="faq-section">
        <h3 className="faq-title">FAQ’s</h3>
        <p className="faq-subtitle">Questions asked frequently</p>
        <div className="faq-grid">
          {faqs.map((item, index) => (
            <div key={index} className="faq-card">
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button className="different-btn">How we are Different</button>
      </div>
    </div>
  );
}
