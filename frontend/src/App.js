import React, { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/Layout';
import AstroDetailsForm from './Pages/AstroDetailsForm';
import AstroWelcome from './Pages/AstroWelcome';
import Chat from './Pages/Chat';
import Signup from './Pages/Signup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TokenPack from './Pages/TokenPack';
import { ChatProvider } from './context/ChatContext';
import IdeaWhatToAsk from './Pages/IdeaWhatToAsk';
import SignupForm from './Pages/SignupForm';
import Login from './Pages/Login';
import Settings from './Pages/Setting';
import ChartDetails from './Pages/ChartDetails';
import Verify from './Pages/Verify';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  
  
  useEffect(() => {
    setIsLogin(localStorage.getItem("islogin") === "true");
  }, []);

  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {!isLogin ? (
            <>
              <Route path="/" element={<Signup />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detail" element={<AstroDetailsForm />} />
              <Route path='/verify' element={<Verify/>}/>
              {/* Redirect all other paths to login */}
              {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
            </>
          ) : (
            <>
              {/* Protected Routes */}
              <Route path="/welcome" element={<AstroWelcome />} />
              <Route path="/pricing" element={<TokenPack />} />
              <Route path="/what-to-ask" element={<IdeaWhatToAsk />} />
              <Route path="/my-settings" element={<Settings />} />
              <Route path="/chart-detail" element={<ChartDetails />} />
              <Route path="/chat" element={<Layout />}>
                <Route index element={<Chat />} />
              </Route>
              {/* Redirect all other paths to /chat */}
              <Route path="*" element={<Navigate to="/chat" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
