import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) return;

      try {
        const res = await axios.post(`${api}/auth/verify`, { token });
        localStorage.setItem("token", res.data.token);
        navigate("/signup");
      } catch (err) {
        console.error("Verification failed:", err.response?.data?.msg || err.message);
      }
    };

    verify();
  }, []);

  return <div>Verifying email...</div>;
};

export default VerifyEmail;
