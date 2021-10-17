import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import googleIcon from "../../resources/img/google-icon.png";
import showEye from "../../resources/vectors/Show.svg";
import hideEye from "../../resources/vectors/Hide.svg";
import backVideo from "../../resources/video/login.mp4";
import debounce from "debounce";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";

const togglePassShow = (e, i) => {
  const passIn = document.querySelectorAll(".pass-auth")[i];
  if (passIn.getAttribute("type") === "password") {
    passIn.setAttribute("type", "text");
    e.target.setAttribute("src", showEye);
    return;
  }
  passIn.setAttribute("type", "password");
  e.target.setAttribute("src", hideEye);
};

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
  }, [history, isAuthed, logout, props.match.path]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rPass, setRPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isUserNameOK, setIsUserNameOK] = useState(false);
  const [isEmailOK, setIsEmailOK] = useState(false);
  const [isPassLengthOK, setIsPassLengthOK] = useState(false);
  const [isPassSpecialOK, setIsPassSpecialOK] = useState(false);
  const [isPassNumberOK, setIsPassNumberOK] = useState(false);
  const [isPassUpperOK, setIsPassUpperOK] = useState(false);

  const loginSignupToggle = (e) => {
    if (isLogin && !e.target.classList.contains("login-btn")) setIsLogin(false);
    else if (!isLogin && !e.target.classList.contains("signup-btn"))
      setIsLogin(true);
  };

  const usernameChange = debounce((e) => {
    const length = e.target.value.length;
    if (length >= 5) {
      setUsername(e.target.value);
      setIsUserNameOK(true);
    } else {
      setUsername("");
      setIsUserNameOK(false);
    }
  }, 300);

  const passChange = debounce((e) => {
    //ids
    const val = e.target.value;

    if (val.length >= 6) setIsPassLengthOK(true);
    else setIsPassLengthOK(false);

    const uppercaseRg = /[A-Z]/;
    if (uppercaseRg.test(val)) setIsPassUpperOK(true);
    else setIsPassUpperOK(false);

    const numRg = /[0-9]/;
    if (numRg.test(val)) setIsPassNumberOK(true);
    else setIsPassNumberOK(false);

    const specialRg = /[^a-zA-Z0-9]/;
    if (specialRg.test(val)) setIsPassSpecialOK(true);
    else setIsPassSpecialOK(false);

    if (isPassSpecialOK && isPassUpperOK && isPassLengthOK && isPassNumberOK) {
      setPass(val);
      setRPass(val);
    } else {
      if (pass && rPass) {
        setPass("");
        setRPass("");
      }
    }
  }, 300);

  const emailChange = debounce((e) => {
    const emailRg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRg.test(e.target.value)) {
      setEmail(e.target.value);
      setIsEmailOK(true);
    } else {
      setEmail("");
      setIsEmailOK(false);
    }
  }, 300);

  const authClick = () => {
    if (!isLogin) {
      if (
        isUserNameOK &&
        isEmailOK &&
        isPassSpecialOK &&
        isPassUpperOK &&
        isPassLengthOK &&
        isPassNumberOK
      ) {
        try {
          signup(email, username, pass);
          history.push("/");
        } catch (error) {
          //TODO handle error
          console.log(error);
        }
      } else {
        alert("لطفا همه موارد رو رعایت کنید");
      }
    } else {
      const emailOrUsername = document.querySelector(
        ".login input[type='email']"
      ).value;
      const password = document.querySelector(".login div input").value;
      try {
        login(emailOrUsername, password);
        history.push("/");
      } catch (error) {
        //TODO handle error
        console.log(error);
      }
    }
  };

  return (
    <div className="auth-container">
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

        <div className={`signup ${isLogin ? "hide" : "show"}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="نام کاربری"
              onChange={usernameChange}
            />
            <input
              type="email"
              placeholder="    ایمیل"
              onChange={emailChange}
            />
            <div>
              <input
                className="pass-auth"
                type="password"
                placeholder=" رمز عبور"
                onChange={passChange}
              />
              <img src={hideEye} onClick={(e) => togglePassShow(e, 0)} alt="" />
            </div>
            <ul className="validations">
              <li className={`${isUserNameOK ? "done" : ""}`}>
                نام کاربری حداقل 5 کاراکتر
              </li>
              <li className={`${isPassLengthOK ? "done" : ""}`}>
                رمز عبور حداقل 6 کاراکتر
              </li>
              <li className={`${isPassUpperOK ? "done" : ""}`}>
                رمز عبور دارای حداقل یک کاراکتر بزرگ انگلیسی
              </li>
              <li className={`${isPassNumberOK ? "done" : ""}`}>
                رمز عبور دارای حداقل یک عدد
              </li>
              <li className={`${isPassSpecialOK ? "done" : ""}`}>
                رمز عبور دارای حداقل یک کاراکتر خاص
              </li>
              <li className={`${isEmailOK ? "done" : ""}`}>ایمیل صحیح</li>
            </ul>
            <div className="auth-btns">
              <button className="submit" type="submit" onClick={authClick}>
                !تمام
              </button>
              <div className="google">
                <img src={googleIcon} alt="" />
                <p>ثبت نام با گوگل</p>
              </div>
            </div>
          </form>
        </div>

        <div className={`login ${isLogin ? "show" : "hide"}`}>
          <form>
            <input type="email" placeholder="نام کاربری یا ایمیل" />

            <div>
              <input
                className="pass-auth"
                type="password"
                placeholder=" رمز عبور"
              />
              <img src={hideEye} onClick={(e) => togglePassShow(e, 1)} alt="" />
            </div>

            <div className="auth-btns">
              <button className="submit" type="submit" onClick={authClick}>
                !تمام
              </button>
              <div className="google">
                <img src={googleIcon} alt="" />
                <p>ثبت نام با گوگل</p>
              </div>
            </div>
          </form>
        </div>

        <p className="rules">
          با ثبت نام در انبارینو موافقت خود را نسبت به <span>قوانین</span> آن
          اعلام میدارید
        </p>
      </div>

      <video src={backVideo} autoPlay muted loop></video>
      <div className="layer"></div>
    </div>
  );
};

export default Auth;
