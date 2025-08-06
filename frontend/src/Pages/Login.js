import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/login.css";
import Navbar from "../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const errorFromGoogle = queryParams.get("error");

    if (errorFromGoogle) {
      setErrMsg(decodeURIComponent(errorFromGoogle));

      // Remove error param from URL
      const cleanedUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanedUrl);
    }
  }, [location.search]);

  // Clear error message when typing in input fields
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrMsg(""); // Clear error message when typing in the inputs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post(`${api}/user/login`, {
        email,
        password,
      });

      setSuccessMsg("Login successful!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("islogin", true);
      window.location.href = "/chat";
    } catch (err) {
      setErrMsg(err.response?.data?.msg || "Login failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h1 className="welcome-text">Welcome back</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group floating-label">
              <input
                type="email"
                placeholder=" "
                required
                value={email}
                onChange={handleInputChange(setEmail)}
              />
              <label>Email address*</label>
            </div>

            <div className="form-group floating-label">
              <input
                type="password"
                placeholder=" "
                required
                value={password}
                onChange={handleInputChange(setPassword)}
              />
              <label>Password*</label>
            </div>

            {errMsg && <p className="error-text">{errMsg}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            <Link href="#" className="forgot-password" to="/forget-password">
              Forget password?
            </Link>

            <button type="submit" className="continue-button">
              Continue
            </button>

            <p className="signup-text">
              Don't have an account?{" "}
              <Link to="/" className="signup-link">
                Sign up
              </Link>
            </p>
          </form>

          <div className="divider">OR</div>

          <div className="social-login-buttons">
            <button
              className="google-button"
              onClick={() => window.location.href = `${api}/auth/google`}
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
              />
              Continue with Google
            </button>
            <button className="microsoft-button">
              <img
                src="https://img.icons8.com/color/16/000000/microsoft.png"
                alt="Microsoft"
              />
              Continue with Microsoft
            </button>
          </div>

          <div className="footer-links">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
}



























// *****************************************************************************************
// original code


// import React, { useState } from "react";
// import axios from "axios";
// import "../assets/css/login.css";
// import Navbar from "../components/Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrMsg("");
//     setSuccessMsg("");

//     try {
//       const res = await axios.post(`${api}/user/login`, {
//         email,
//         password,
//       });
  

//       setSuccessMsg("Login successful!");
//       console.log("User:", res.data.user);

//       // Optional: store JWT
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("islogin", true)
//       window.location.href = "/chat";
//       // redirect or navigate to dashboard
//     } catch (err) {
//       setErrMsg(err.response?.data?.msg || "Login failed.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="login-container">
//         <div className="login-card">
//           <h1 className="welcome-text">Welcome back</h1>

//           <form className="login-form" onSubmit={handleSubmit}>
//             <div className="form-group floating-label">
//               <input
//                 type="email"
//                 placeholder=" "
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label>Email address*</label>
//             </div>

//             <div className="form-group floating-label">
//               <input
//                 type="password"
//                 placeholder=" "
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <label>Password*</label>
//             </div>

//             {errMsg && <p className="error-text">{errMsg}</p>}
//             {successMsg && <p className="success-text">{successMsg}</p>}

//             <Link href="#" className="forgot-password" to="/forget-password">
//               Forget password?
//             </Link>

//             <button type="submit" className="continue-button">
//               Continue
//             </button>

//             <p className="signup-text">
//               Don't have an account?{" "}
//               <Link to="/" className="signup-link" >
//                 Sign up
//               </Link>
//             </p>
//           </form>

//           <div className="divider">OR</div>

//           <div className="social-login-buttons">
//             <button className="google-button" onClick={() => window.location.href = `${api}/auth/google`}>
//               <img
//                 src="https://img.icons8.com/color/16/000000/google-logo.png"
//                 alt="Google"
//               />
//               Continue with Google
//             </button>
//             <button className="microsoft-button">
//               <img
//                 src="https://img.icons8.com/color/16/000000/microsoft.png"
//                 alt="Microsoft"
//               />
//               Continue with Microsoft
//             </button>
//           </div>

//           <div className="footer-links">
//             <a href="#">Terms of Use</a>
//             <a href="#">Privacy Policy</a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
