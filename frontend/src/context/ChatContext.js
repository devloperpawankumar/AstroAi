// context/ChatContext.js
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState("empty");
  const [chatHistory, setChatHistory] = useState(() => {
    const stored = localStorage.getItem("chatHistory");
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat,chatHistory , setChatHistory}}>
      {children}
    </ChatContext.Provider>
  );
};
