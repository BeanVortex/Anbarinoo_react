import React from "react";
import googleIcon from "../../resources/img/google-icon.png";
import "./Login.scss";

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
          <h3>ثبت نام</h3>
          <h3>ورود</h3>
          <div className="movable"></div>
        </div>

        <form>
          <input type="text" placeholder="نام کاربری" />
          <input type="email" placeholder="ایمیل" />
          <input type="password" placeholder="رمز عبور" />
          <input type="password" placeholder="تکرار رمز عبور" />
        </form>

        <ul className="validations">
          <li>دارای حداقل یک کاراکتر بزرگ انگلیسی</li>
          <li>دارای حداقل یک عدد</li>
          <li>دارای حداقل یک کاراکتر خاص</li>
        </ul>

        <div className="login-btns">
          <button className="submit">تمام</button>
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
