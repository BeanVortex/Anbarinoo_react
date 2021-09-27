import React from "react";
import googleIcon from "../../resources/img/google-icon.png";
import "./Login.scss";

const loginSignupToggle = (e) => {
  const movable = document.querySelector(".auth-options .movable");
  if (e.target.classList.contains("signup")) {
    const login = document.querySelector(".auth-options .login");
    e.target.classList.add("selected");
    login.classList.remove("selected");
    movable.style.right = 0.5 + "rem";
  } else {
    const signup = document.querySelector(".auth-options .signup");
    e.target.classList.add("selected");
    signup.classList.remove("selected");
    movable.style.right = "calc(50% - 0.5rem)";
  }
};

const usernameChange = (e) => {
  const usernameItem = document.querySelector(".validations").children[0];
  const length = e.target.value.length;
  if (length >= 5) {
    usernameItem.classList.add("done");
  } else {
    usernameItem.classList.remove("done");
  }
};

const passChange = (e) => {
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
  if(uppercaseRg.test(val)){
    enChar.classList.add("done");
  }else{
    enChar.classList.remove("done");
  }

  const numRg = /[0-9]/;
  if(numRg.test(val)){
    num.classList.add("done");
  }else{
    num.classList.remove("done");
  }

  const specialRg = /[^a-zA-Z0-9]/;
  if (specialRg.test(val)) {
    spChar.classList.add("done");
  } else {
    spChar.classList.remove("done");
  }
};

const Login = () => {
  return (
    <div className="login-container">
      <div className="title">
        <h1>
          سیستمی برای مدیریت انبار و فروشگاه به بهترین صورت و امکانات جذاب و
          کاربردی
        </h1>
      </div>
      <div className="login-cart">
        <div className="auth-options">
          <div className="movable"></div>
          <h3 className="signup selected" onClick={loginSignupToggle}>
            ثبت نام
          </h3>
          <h3 className="login" onClick={loginSignupToggle}>
            ورود
          </h3>
        </div>

        <form>
          <input
            type="text"
            placeholder="نام کاربری"
            onChange={usernameChange}
          />
          <input type="email" placeholder="ایمیل" />
          <input
            type="password"
            placeholder=" رمز عبور"
            onChange={passChange}
          />
        </form>

        <ul className="validations">
          <li>نام کاربری حداقل 5 کاراکتر</li>
          <li>رمز عبور حداقل 6 کاراکتر</li>
          <li>رمز عبور دارای حداقل یک کاراکتر بزرگ انگلیسی</li>
          <li>رمز عبور دارای حداقل یک عدد</li>
          <li>رمز عبور دارای حداقل یک کاراکتر خاص</li>
        </ul>

        <div className="login-btns">
          <button className="submit">!تمام</button>
          <div className="google">
            ثبت نام با گوگل <img src={googleIcon} alt="" />
          </div>
        </div>

        <p className="rules">
          با ثبت نام در انبارینو موافقت خود را نسبت به <span>قوانین</span> آن
          اعلام میدارید
        </p>
      </div>
    </div>
  );
};
export default Login;
