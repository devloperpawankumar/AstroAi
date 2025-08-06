import React, { useContext, useState } from 'react';
import { FaRegCopy, FaThumbsUp, FaThumbsDown, FaMicrophone } from 'react-icons/fa';
import { useChat } from '../context/ChatContext';
import { ThemeContext } from '../ThemeContext';

const ReactionBar = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [voted, setVoted] = useState(false);
   const { darkMode } = useContext(ThemeContext);

  const handleLike = () => {
    if (!voted) {
      setLikes(likes + 1);
      setVoted(true);
    }
  };

  const handleDislike = () => {
    if (!voted) {
      setDislikes(dislikes + 1);
      setVoted(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('Copied content here!')
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Failed to copy!'));
  };

  const handleMicrophone = () => {
    alert('Microphone clicked!');
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '20px' }}>
      <button onClick={handleCopy} style={darkMode? darkButtonStyle : buttonStyle}><FaRegCopy /></button>
      <button onClick={handleLike} disabled={voted} style={darkMode? darkButtonStyle : buttonStyle}>
        <FaThumbsUp /> {likes}
      </button>
      <button onClick={handleDislike} disabled={voted} style={darkMode? darkButtonStyle : buttonStyle}>
        <FaThumbsDown /> {dislikes}
      </button>
      <button onClick={handleMicrophone} style={darkMode? darkButtonStyle : buttonStyle}><FaMicrophone /></button>
    </div>
  );
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  color: '#909090',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
};

const darkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
}

export default ReactionBar;
