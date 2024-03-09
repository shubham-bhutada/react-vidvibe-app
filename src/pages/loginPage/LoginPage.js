import React, { useEffect } from "react";
import logo from "../../assets/vidvibe_full_logo.png";
import "./loginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <div className="login">
      <div className="login_container">
        <img src={logo} alt="logo" />
        <button onClick={() => handleLogin()}>Login with Google</button>
        <p className="text">This Project is made using YOUTUBE WEB API's</p>
        <p>BY - Shubham Bhutada</p>
      </div>
    </div>
  );
};

export default LoginPage;
