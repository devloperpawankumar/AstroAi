import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaPlus,
  FaComments,
  FaCalendarAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import "../assets/css/Layout.css";
import icon1 from "../assets/images/account setting.png";
import icon2 from "../assets/images/card-outline.png";
import icon3 from "../assets/images/referrel.png";
import icon4 from "../assets/images/dark theme.png";
import icon5 from "../assets/images/log-out-outline.png";
import { ThemeContext } from "../ThemeContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import api from "../api/axios";
import defaultChats from "../data/chatDara";
import AstroLogo from "../assets/images/welcomelogo.png"
import icon6 from "../assets/images/image 1.png"
import icon7 from "../assets/images/chatbox-outline 1.png"
import icon8 from "../assets/images/Group.png"
import icon9 from "../assets/images/Group (1).png"
import icon10 from "../assets/images/Vector (1).png"
import icon11 from "../assets/images/Group 7.png"
import icon12 from "../assets/images/plus.png"
import darklogo from "../assets/images/darklogo.png"
const Layout = ({ children }) => {
  const modalRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOpen1, setSidebarOpen1] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { selectedChat, setSelectedChat,chatHistory, setChatHistory} = useChat();
  
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
  
    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);
  
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

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("islogin");
    window.location.href = "/login";
  };

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chatHistory"));
    if (savedChats && savedChats.length) {
      setChatHistory(savedChats);
    } else {
      setChatHistory(defaultChats);
      localStorage.setItem("chatHistory", JSON.stringify(defaultChats));
    }
  }, []);

  

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "", // initially blank
      content: "",
      category: null,
      createdAt: new Date().toISOString(),
    };

    const updatedChats = [newChat, ...chatHistory].slice(0, 10); // keep last 10
    setChatHistory(updatedChats);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
    setSelectedChat("empty"); // clear input or editor
  };

  // Show last 3 chats
  const recentChats = chatHistory.slice(0, 3);

  // Group chats by category (Marriage, Finance, etc.)
  const groupedChats = chatHistory.reduce((groups, chat) => {
    const category = chat.category;
  
    // Skip null, empty, or "General"
    if (!category || category === "General") return groups;
  
    if (!groups[category]) groups[category] = [];
    if (groups[category].length < 10) groups[category].push(chat);
  
    return groups;
  }, {});
  

  return (
    <div style={{ backgroundColor: darkMode ? "#1E1E1E" : "#fff" }}>
      <div className="layout">
        {/* Sidebar */}
        <div
          className={`sidebar ${darkMode ? "darksidebar" : "lightsidebar"} ${
            sidebarOpen ? "open" : ""
          }`}
        >
          <div className="sidebar-header">
            <FaBars
              className="toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            {/* {sidebarOpen && <span className="brand">Astro Ai</span>}
            <span className="brand1">Astro Ai</span> */}
          </div>

          {!sidebarOpen ? (
            <div className="responsiveMenu">
              <FaBars
                className="toggle-btn1"
                onClick={() => setSidebarOpen1(!sidebarOpen1)}
              />

              <button
                className={`${darkMode ? "new-chat-btn1" : "new-chat-btn2"}`}
                onClick={handleNewChat}
              >
                <img src={icon11} alt="icon" width={20} height={20} />
              </button>
            </div>
          ) : (
            <>
              <button
                className="new-chat-btn"
                style={{ color: darkMode ? "#fff" : "#8B8B8B" }}
                onClick={handleNewChat}
              >
                 <img src={icon12} alt="icon" width={15} height={15} /> New chat
              </button>
            </>
          )}

          {sidebarOpen && (
            <div className="recent">
              <div className="recent-title">Recent</div>
              <ul>
                {recentChats.map((chat) => (
                  <li key={chat.id} onClick={() => setSelectedChat(chat.title)}>
                     <img src={icon7} alt="icon" width={15} height={15} /> {chat.title || "Untitled"}
                  </li>
                ))}
              </ul>

              {Object.entries(groupedChats).map(([category, chats]) => (
  <div key={category}>
    <div className="recent-title" style={{ marginTop: "20px" }}>
      {category}
    </div>
    <ul>
      {chats.map((chat) => (
        <li
          key={chat.id}
          onClick={() => setSelectedChat(chat.title)}
        >
          <img src={icon7} alt="icon" width={15} height={15} /> {chat.title || "Untitled"}
        </li>
      ))}
    </ul>
  </div>
))}

            </div>
          )}

{sidebarOpen1 && (
  <div className={darkMode?"darkrecent1":"recent1"}>
    <div className="recent-title">Recent</div>
    <ul>
      {recentChats.map((chat) => (
        <li
          key={chat.id}
          onClick={() => {
            setSelectedChat(chat.title);
            setSidebarOpen1(false);
          }}
        >
          <img src={icon7} alt="icon" width={15} height={15} /> {chat.title || "Untitled"}
        </li>
      ))}
    </ul>

    {Object.entries(groupedChats)
  .filter(([category]) => category !== "" && category !== null && category !== "General") // hide null and "General"
  .map(([category, chats]) => (
    chats.length > 0 ? (
      <div key={category}>
        <div className="recent-title" style={{ marginTop: "20px" }}>
          {category}
        </div>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.title);
                setSidebarOpen1(false);
              }}
            >
              <img src={icon7} alt="icon" width={15} height={15} /> {chat.title || "Untitled"}
            </li>
          ))}
        </ul>
      </div>
    ) : null
  ))}



  </div>
)}


          <div className="sidebar-footer">
            <div className="menu-item" onClick={() => Navigate("/what-to-ask")}>
            <img src={icon10} alt="icon" width={15} height={15} />
              {sidebarOpen && <span>Idea what to ask</span>}
            </div>
            <div className="menu-item" onClick={()=>Navigate("/chart-detail")}>
            <img src={icon9} alt="icon" width={15} height={15} /> 
              {sidebarOpen && <span>Chart detail</span>}
            </div>
            <div
              className="menu-item"
              onClick={() => setShowSettings(!showSettings)}
              style={{ marginTop: "20px" }}
            >
             <img src={icon8} alt="icon" width={15} height={15} />
              {sidebarOpen && <span>Settings</span>}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main">
          <div className="layouthead">
        <span className="headlogo">{darkMode? <img src={darklogo} alt="logo"/>:<img src={AstroLogo} alt="logo"/>}</span>
          <div className="top-right">
            <img src={icon6} alt="icon" />
            <button className="limit-btn" style={{color: darkMode ? "#fff": "#5f5f5f"}}>Limit 5 left</button>
            <FaQuestionCircle className="icon" />
            <div className="avatar">{email.charAt(0).toUpperCase()}</div>
          </div>

          </div >

          {/* Pass selectedChat to children only if valid React element */}
          <Outlet />
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div  ref={modalRef} className={`settings-modal ${darkMode ? "dark" : "light"}`}>
          <div className="settings-item" onClick={()=>Navigate("/my-settings")}>
            <img src={icon1} alt="icon" width={15} height={15} />{" "}
            <span>Account Settings</span>
          </div>
          <div className="settings-item">
            <img src={icon2} alt="icon" width={15} height={15} />{" "}
            <span>Billing</span>{" "}
            <span className="badge1" onClick={() => Navigate("/pricing")}>
              Upgrade
            </span>
          </div>
          <div className="settings-item">
            <img src={icon3} alt="icon" width={15} height={15} />{" "}
            <span>My Referrals</span> <span className="new-tag">New</span>
          </div>
          <div className="settings-item">
            <img src={icon4} alt="icon" width={15} height={15} />{" "}
            <span>Dark Mode</span>
            <div
              className={`toggle-switch ${darkMode ? "on" : ""}`}
              onClick={toggleTheme}
            >
              <div className="switch-handle" />
            </div>
          </div>
          <div className="settings-item" onClick={handleLogout}>
            <img src={icon5} alt="icon" width={15} height={15} />{" "}
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
