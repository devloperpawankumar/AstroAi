import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";

const Verify = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // ✅ GET token from URL (NOT localStorage)
    console.log(token)
    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    axios.get(`${api}/auth/verify?token=${token}`)
      .then(res => {
        setStatus("✅ Email verified successfully! Redirecting...");
        console.log(res)
        if (res.data?.verified === true) { // ✅ check if verified true from backend
            navigate("/signup"); // ✅ if verified then directly redirect
          } else {
            setStatus("❌ Verification failed.");
          }
      })
      .catch(err => {
        setStatus("❌ Verification failed or link expired.");
        console.log(err)
      });
  }, [navigate]);

  return (
    <div className="verify-page">
      <h1>{status}</h1>
    </div>
  );
};

export default Verify;
