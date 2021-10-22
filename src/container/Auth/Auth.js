import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import googleIcon from "../../resources/img/google-icon.png";
import showEye from "../../resources/vectors/Show.svg";
import hideEye from "../../resources/vectors/Hide.svg";
import backVideo from "../../resources/video/login.mp4";
import debounce from "debounce";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";

import Load from "../../components/load/Load";
import { toastError, toastWarn } from "../../utils/ToastUtil";

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

  //signup field states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  //signup field validation states
  const [isUserNameOK, setIsUserNameOK] = useState(false);
  const [isEmailOK, setIsEmailOK] = useState(false);
  const [isPassLengthOK, setIsPassLengthOK] = useState(false);
  const [isPassSpecialOK, setIsPassSpecialOK] = useState(false);
  const [isPassNumberOK, setIsPassNumberOK] = useState(false);
  const [isPassUpperOK, setIsPassUpperOK] = useState(false);
  const [isSignupPassVisible, setIsSignupPassVisible] = useState(false);
  //login field states
  const [loginUsernameOrEmail, setLoginUsernameOrEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [isLoginPassVisible, setIsLoginPassVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loginSignupToggle = (e) => {
    if (isLogin && !e.target.classList.contains("login-btn")) setIsLogin(false);
    else if (!isLogin && !e.target.classList.contains("signup-btn"))
      setIsLogin(true);
  };

  const signupUsernameChange = debounce((e) => {
    const length = e.target.value.length;
    if (length >= 5) {
      setUsername(e.target.value);
      setIsUserNameOK(true);
    } else {
      setUsername("");
      setIsUserNameOK(false);
    }
  }, 300);

  const signupPassChange = debounce((e) => {
    const val = e.target.value;

    if (val.length >= 6) {
      if (!isPassLengthOK) {
        setIsPassLengthOK(true);
        setPass(val);
      }
    } else setIsPassLengthOK(false);

    const uppercaseRg = /[A-Z]/;
    if (uppercaseRg.test(val)) {
      if (!isPassUpperOK) {
        setIsPassUpperOK(true);
        setPass(val);
      }
    } else setIsPassUpperOK(false);

    const numRg = /[0-9]/;
    if (numRg.test(val)) {
      if (!isPassNumberOK) {
        setIsPassNumberOK(true);
        setPass(val);
      }
    } else setIsPassNumberOK(false);

    const specialRg = /[^a-zA-Z0-9]/;
    if (specialRg.test(val)) {
      if (!isPassSpecialOK) {
        setIsPassSpecialOK(true);
        setPass(val);
      }
    } else setIsPassSpecialOK(false);
  }, 300);

  const signupEmailChange = debounce((e) => {
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

  const loginUsernameOrEmailChange = debounce((e) => {
    const val = e.target.value;
    if (val) setLoginUsernameOrEmail(val);
    else setLoginUsernameOrEmail("");
  });
  const loginPassChange = debounce((e) => {
    const val = e.target.value;
    if (val) setLoginPass(val);
    else setLoginPass("");
  });

  const signupHandler = () => {
    setIsLoading(true);
    if (
      isUserNameOK &&
      isEmailOK &&
      isPassSpecialOK &&
      isPassUpperOK &&
      isPassLengthOK &&
      isPassNumberOK
    ) {
      signup(email, username, pass)
        .then(() => {
          setIsLoading(false);
          setTimeout(() => {
            history.push("/");
          }, 50);
        })
        .catch((_err) => {
          setIsLoading(false);
          toastError("مشکلی پیش آمد دوباره امتحان کنید");
          //todo handle error
        });
    } else {
      setIsLoading(false);
      toastWarn("لطفا همه موارد ثبت نام را رعایت کنید");
    }
  };

  const loginHandler = () => {
    setIsLoading(true);
    if (loginUsernameOrEmail && loginPass) {
      login(loginUsernameOrEmail, loginPass)
        .then(() => {
          setIsLoading(false);
          setTimeout(() => {
            history.push("/");
          }, 50);
        })
        .catch((_err) => {
          setIsLoading(false);
          toastError("مشکلی پیش آمد دوباره امتحان کنید");
          //todo handle error
        });
    } else {
      setIsLoading(false);
      toastWarn("لطفا نام کاربری و پسورد درستی وارد کنید");
    }
  };

  const signupTogglePassShow = () => {
    if (isSignupPassVisible) setIsSignupPassVisible(false);
    else setIsSignupPassVisible(true);
  };
  const loginTogglePassShow = () => {
    if (isLoginPassVisible) setIsLoginPassVisible(false);
    else setIsLoginPassVisible(true);
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

        <div className={`signup ${isLogin ? "hide" : "show"}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="نام کاربری"
              onChange={signupUsernameChange}
            />
            <input
              type="email"
              placeholder="    ایمیل"
              onChange={signupEmailChange}
            />
            <div>
              <input
                className="pass-auth"
                type={isSignupPassVisible ? "text" : "password"}
                placeholder=" رمز عبور"
                onChange={signupPassChange}
              />
              <img
                src={isSignupPassVisible ? showEye : hideEye}
                onClick={signupTogglePassShow}
                alt=""
              />
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
              <button className="submit" type="submit" onClick={signupHandler}>
                !تمام
              </button>
              <div className="google">
                <div>
                  <img src={googleIcon} alt="" />
                </div>
                <p>ثبت نام با گوگل</p>
              </div>
            </div>
          </form>
        </div>

        <div className={`login ${isLogin ? "show" : "hide"}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="نام کاربری یا ایمیل"
              onChange={loginUsernameOrEmailChange}
            />

            <div>
              <input
                className="pass-auth"
                type={isLoginPassVisible ? "text" : "password"}
                placeholder=" رمز عبور"
                onChange={loginPassChange}
              />
              <img
                src={isLoginPassVisible ? showEye : hideEye}
                onClick={loginTogglePassShow}
                alt=""
              />
            </div>

            <div className="auth-btns">
              <button className="submit" type="submit" onClick={loginHandler}>
                !تمام
              </button>
              <div className="google">
                <div>
                  <img src={googleIcon} alt="" />
                </div>
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
      <ToastContainer />
    </div>
  );
};

export default Auth;
