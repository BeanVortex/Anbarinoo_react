import React, { useState } from "react";
import googleIcon from "../../resources/img/google-icon.png";
import backVideo from "../../resources/video/login.mp4";
import debounce from "debounce";
import "./Auth.scss";

const loginSignupToggle = (e) => {
  const movable = document.querySelector(".auth-options .movable");
  const login = document.querySelector(".login");
  const signup = document.querySelector(".signup");
  if (e.target.classList.contains("signup-btn")) {
    const loginBtn = document.querySelector(".auth-options .login-btn");
    e.target.classList.add("selected");
    loginBtn.classList.remove("selected");
    movable.style.right = 0.5 + "rem";
    login.classList.remove("show");
    signup.classList.remove("hide");
  } else {
    const signupBtn = document.querySelector(".auth-options .signup-btn");
    e.target.classList.add("selected");
    signupBtn.classList.remove("selected");
    movable.style.right = "calc(50% - 0.5rem)";
    login.classList.add("show");
    signup.classList.add("hide");
  }
};

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rPass, setRPass] = useState("");

  const usernameChange = debounce((e) => {
    const usernameItem = document.querySelector(".validations").children[0];
    const length = e.target.value.length;
    if (length >= 5) {
      usernameItem.classList.add("done");
      setUsername(e.target.value);
    } else {
      usernameItem.classList.remove("done");
      setUsername("");
    }
  }, 300);

  const passChange = debounce((e) => {
    const items = document.querySelector(".validations").children;
    const charLen = items[1];
    const enChar = items[2];
    const num = items[3];
    const spChar = items[4];

    const val = e.target.value;

    if (val.length >= 6) {
      charLen.classList.add("done");
    } else {
      charLen.classList.remove("done");
    }

    const uppercaseRg = /[A-Z]/;
    if (uppercaseRg.test(val)) {
      enChar.classList.add("done");
    } else {
      enChar.classList.remove("done");
    }

    const numRg = /[0-9]/;
    if (numRg.test(val)) {
      num.classList.add("done");
    } else {
      num.classList.remove("done");
    }

    const specialRg = /[^a-zA-Z0-9]/;
    if (specialRg.test(val)) {
      spChar.classList.add("done");
    } else {
      spChar.classList.remove("done");
    }

    if (
      charLen.classList.contains("done") &&
      enChar.classList.contains("done") &&
      numRg.classList.contains("done") &&
      specialRg.classList.contains("done")
    ) {
      setPass(val);
      setRPass(val);
    } else {
      setPass("");
      setRPass("");
    }
  }, 300);

  const emailChange = debounce((e) => {
    const emailItem = document.querySelector(".validations").children[5];
    const emailRg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRg.test(e.target.value)) {
      emailItem.classList.add("done");
      setEmail(e.target.value);
    } else {
      emailItem.classList.remove("done");
      setEmail("");
    }
  }, 300);

  const authClick = () => {
    let counter = 0;
    const validations = document.querySelectorAll(".validations li");
    validations.forEach((item) => {
      if (item.classList.contains("done")) counter++;
    });

    if (counter === validations.length) {
      //request
    } else {
      alert("همه موارد رو رعایت کنید");
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

      <div className="cart">
        <div className="auth-options">
          <h3 className="signup-btn selected" onClick={loginSignupToggle}>
            ثبت نام
          </h3>
          <h3 className="login-btn" onClick={loginSignupToggle}>
            ورود
          </h3>
          <div className="movable"></div>
        </div>

        <div className="signup">
          <form>
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
                type="password"
                placeholder=" رمز عبور"
                onChange={passChange}
              />
              
            </div>
          </form>

          <ul className="validations">
            <li>نام کاربری حداقل 5 کاراکتر</li>
            <li>رمز عبور حداقل 6 کاراکتر</li>
            <li>رمز عبور دارای حداقل یک کاراکتر بزرگ انگلیسی</li>
            <li>رمز عبور دارای حداقل یک عدد</li>
            <li>رمز عبور دارای حداقل یک کاراکتر خاص</li>
            <li>ایمیل صحیح</li>
          </ul>
        </div>

        <div className="login">
          <form>
            <input type="email" placeholder="نام کاربری یا ایمیل" />
            <input type="password" placeholder=" رمز عبور" />
          </form>
        </div>

        <div className="auth-btns">
          <button className="submit" onClick={authClick}>
            !تمام
          </button>
          <div className="google">
            ثبت نام با گوگل <img src={googleIcon} alt="" />
          </div>
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
