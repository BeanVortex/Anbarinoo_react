import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Nav.scss";
import homeImg from "../../resources/vectors/Home.svg";
import plusImg from "../../resources/vectors/Plus.svg";
import categoryImg from "../../resources/vectors/Category.svg";
import statisticImg from "../../resources/vectors/Chart.svg";
import documentImg from "../../resources/vectors/Document.svg";
import settingsImg from "../../resources/vectors/Setting.svg";
import logoutImg from "../../resources/vectors/Logout.svg";

const linkHintHandler = () => {
  const links = document.querySelectorAll(".nav ul li a");
  links.forEach(link => {
    const hint = link.nextElementSibling;
    link.onmouseover = () => {
      if(!hint.classList.contains("showHint")){
        hint.classList.add("showHint");
      }
    }
    link.onmouseleave = () => {
      if(hint.classList.contains("showHint")){
        hint.classList.remove("showHint");
      }
    }
  })
};


const Nav = () => {
  const { userInfo } = useContext(AuthContext);
  linkHintHandler();
  return (
    <nav className="nav">
      <div className="info">
        <img src={(userInfo && userInfo.profile) || null} alt="" />
        <h3>{(userInfo && userInfo.username) || "علی"}</h3>
      </div>

      <ul>
        <li>
          <Link to="/" className="link">
            <img src={homeImg} alt="" />
          </Link>
          <div className="hint">خانه</div>
        </li>
        <li>
          <Link to="/new-product" className="link">
            <img src={plusImg} alt="" />
          </Link>
          <div className="hint">محصول جدید</div>
        </li>
        <li>
          <Link to="/category" className="link">
            <img src={categoryImg} alt="" />
          </Link>
          <div className="hint">دسته ها</div>
        </li>
        <li>
          <Link to="/statistic" className="link">
            <img src={statisticImg} alt="" />
          </Link>
          <div className="hint">آمار و ارقام</div>
        </li>
        <li>
          <Link to="/report" className="link">
            <img src={documentImg} alt="" />
          </Link>
          <div className="hint">گزارشات</div>
        </li>
        <li>
          <Link to="/settings" className="link">
            <img src={settingsImg} alt="" />
          </Link>
          <div className="hint">تنظیمات</div>
        </li>
        <li>
          <Link to="/logout" className="link">
            <img src={logoutImg} alt="" />
          </Link>
          <div className="hint">خروج از حساب</div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
