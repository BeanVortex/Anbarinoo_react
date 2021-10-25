import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import backVideo from "../../resources/video/login.mp4";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import Load from "../../components/load/Load";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

const Auth = (props) => {
  const { signup, login, logout, isAuthed } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (props.match.path === "/logout") {
      logout();
      history.push("/auth");
    } else {
      if (isAuthed) history.push("/");
    }
    return () => {};
  }, [history, isAuthed, logout, props.match.path]);

  const [isLogin, setIsLogin] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loginSignupToggle = (e) => {
    if (isLogin && !e.target.classList.contains("login-btn")) setIsLogin(false);
    else if (!isLogin && !e.target.classList.contains("signup-btn"))
      setIsLogin(true);
  };

  return (
    <div className="auth-container">
      {isLoading ? <Load type="ball-grid-pulse" /> : null}
      <div className="title">
        <h1>
          سیستمی برای مدیریت انبار و فروشگاه به بهترین صورت و امکانات جذاب و
          کاربردی
        </h1>
      </div>

      <div className="card">
        <div className="auth-options">
          <h3
            className={`signup-btn ${isLogin ? "" : "selected"}`}
            onClick={loginSignupToggle}
          >
            ثبت نام
          </h3>
          <h3
            className={`login-btn ${isLogin ? "selected" : ""}`}
            onClick={loginSignupToggle}
          >
            ورود
          </h3>
          <div
            className="movable"
            style={
              isLogin ? { right: "calc(50% - 0.5rem)" } : { right: "0.5rem" }
            }
          ></div>
        </div>

        <Signup isLogin={isLogin} setIsLoading={setIsLoading} signup={signup} />

        <Login isLogin={isLogin} setIsLoading={setIsLoading} login={login} />

        <p className="rules">
          با ثبت نام در انبارینو موافقت خود را نسبت به <span>قوانین</span> آن
          اعلام میدارید
        </p>
      </div>

      <video src={backVideo} autoPlay muted loop></video>
      <div className="layer"></div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
