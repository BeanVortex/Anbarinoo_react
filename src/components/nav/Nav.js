import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../../utils/AuthUtil";
import "./Nav.scss";
import homeImg from "../../resources/vectors/Home.svg";
import categoryImg from "../../resources/vectors/Category.svg";
import statisticImg from "../../resources/vectors/Chart.svg";
import documentImg from "../../resources/vectors/Document.svg";
import settingsImg from "../../resources/vectors/Setting.svg";
import logoutImg from "../../resources/vectors/Logout.svg";
import axios from "axios";
import { BaseUrl } from "../../index";

const Nav = () => {
  const { userInfo, setUserInfo, logout, userAuth } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo.username && !userInfo.img && !userAuth.authenticated) {
      if (isAuthenticated()) {
        axios
          .get("/api/user/info/")
          .then((res) => {
            setUserInfo({
              username: res.data.userName,
              profile:
                BaseUrl + "/user/profile_images/" + res.data.profileImage,
              email: res.data.email,
            });
          })
          .catch((err) => {
            if (err.status === 401) {
              logout();
              history.push("/auth");
            }
          });
      }else{
        history.push("/auth");
      }
    }
  }, [history, logout, setUserInfo, userAuth, userInfo]);


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
        </li>
        <li>
          <Link to="/category" className="link">
            <img src={categoryImg} alt="" />
          </Link>
        </li>
        <li>
          <Link to="/statistic" className="link">
            <img src={statisticImg} alt="" />
          </Link>
        </li>
        <li>
          <Link to="/report" className="link">
            <img src={documentImg} alt="" />
          </Link>
        </li>
        <li>
          <Link to="/settings" className="link">
            <img src={settingsImg} alt="" />
          </Link>
        </li>
        <li>
          <Link to="/logout" className="link">
            <img src={logoutImg} alt="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
