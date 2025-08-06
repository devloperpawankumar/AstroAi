import React, { useContext, useState } from "react";
import "../assets/css/chat.css";
import ChatImage from "../assets/images/chart natal display.png";
import chat1 from "../assets/images/chat1.png";
import chat2 from "../assets/images/chat2.png";
import { FaArrowRight, FaMicrophone } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";
import Logo from "../assets/images/logo ai.png";
import chatData from "../data/chatDara"; // Make sure it's the correct file path and name
import { useChat } from "../context/ChatContext";
import ReactionBar from "../components/ReactionBar";

const Chat = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const { selectedChat, chatHistory, setChatHistory } = useChat();
  

  const normalize = (text) =>
    text?.toLowerCase().replace(/[^a-z0-9 ]/gi, "").trim();

  const saveChat = (text, category = null) => {
    if (!text || typeof text !== "string") return;

    const newChat = {
      id: Date.now(),
      title: text.substring(0, 30),
      content: text,
      category,
      createdAt: new Date().toISOString(),
    };

    const updatedChats = [newChat, ...chatHistory].slice(0, 10);
    setChatHistory(updatedChats);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
  };

  const handleQuery = () => {
    const normalizedQuery = normalize(query);

    const matched = chatData.find(chat =>
      normalize(chat.title).includes(normalizedQuery)
    );

    const finalResponse = matched || {
      title: query,
      content: "Sorry, I couldn't find a matching prediction.",
      dates: [],
    };

    saveChat(finalResponse.content); // Save the response content
    setResponse(finalResponse);
  };

  return (
    <>
      {selectedChat === "empty" && !response ? (
        <>
          <h1 className="title" style={{ color: darkMode ? "white" : "#454545" }}>
            Hello, Simon S
          </h1>
          <p className="subtitle" style={{ color: darkMode ? "#ccc" : "#909090" }}>
            We create your <strong>Natal chart</strong> as per details provided by you
          </p>
          <div className="chart-container">
            <img src={ChatImage} alt="Natal Chart" />
          </div>
        </>
      ) : (
        <div className="chat-window">
          <div className="chatcont">
            <img src={Logo} alt="logo" />
            {(response || chatData.find(chat => chat.title === selectedChat)) && (
              <div className="chat-bubble bot" style={{ color: darkMode ? "#BABABA" : "#333" }}>
                {(response || chatData.find(chat => chat.title === selectedChat)).content}
                <div className="chat-dates">
                  {(response || chatData.find(chat => chat.title === selectedChat)).dates.map((date, idx) => (
                    <div key={idx} className={`date-text${idx === 1 ? "1" : ""}`} style={{ color: darkMode ? "#BABABA" : "#333" }}>
                      {date}
                    </div>
                  ))}
                </div>
                <ReactionBar/>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bottomcont">
        <div className={darkMode?"suggestions1": "suggestions"}>
          <button
            onClick={() => {
              const question = "When will I get Married ?";
              setQuery(question);
              handleQuery();
            }}
          >
            <img src={chat1} alt="icon" width={30} height={20} /> When will I get Married ?
          </button>
          <button
            onClick={() => {
              const question = "Love or Arranged Marriage ?";
              setQuery(question);
              handleQuery();
            }}
          >
            <img src={chat2} alt="icon" width={15} height={15} /> Love or Arranged Marriage ?
          </button>
        </div>

        <div className={`query-box ${darkMode ? "inputdark" : "inputlight"}`}>
          <input
            type="text"
            placeholder="Ask me astrological related queries...."
            value={query}
            style={{ color: "#000" }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FaMicrophone className="icon" />
          <div className="send" onClick={handleQuery}>
            <FaArrowRight className="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
