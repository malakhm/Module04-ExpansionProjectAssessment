import React, { useState, useContext } from "react";

import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from '../assets/logo.jpg';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
const Signin = () => {
  const { setUser, setToken, fetchData } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/sign",
        {
          email,
          password,
        }
      );

      const Data = response.data;
      console.log("Data:", Data);
      console.log("Access Token:", Data.accessToken);

      if (response.status === 200) {
        const token = response.data.accessToken;
        setToken(token);
        await new Promise((resolve) => {
          localStorage.setItem("token", token);
          resolve();
        });
        await fetchData();
        
          navigate("/products");
        
        setUser(response.data);
      } 
    } catch (error) {
      console.log("Failed to log in", error.message);
    }
  };

  return (
    <div className="ASignInPage-Container">
      <div className="ASignInPage-Content">
        <div className="ASignInPage-first-part">
          <img alt="" className="BLogo" src={Logo} />
        </div>
        <div className="ASignInPage-second-part">
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              className="signin-input-a email-input1"
              type="email"
              placeholder="Enter your email"
              onChange={handleEmail}
              required
            />
            <br />
            <label>Password</label>
            <div className="password-input-container">
              <div className="input-wrapper">
                <input
                  className="signin-input-a password-input1"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={handlePassword}
                  required
                />
              </div>
              <div
                className={`eye-wrapper ${
                  window.innerWidth > 600 ? "white-icon" : ""
                }`}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <BsEyeFill size={20} />
                ) : (
                  <BsEyeSlashFill size={20} />
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-blue">
              Login
            </button>
          </form>
          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              <span className="signup-word">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
