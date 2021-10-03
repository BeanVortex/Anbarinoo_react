import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import "./Nav.scss";
import profileImg from "../../resources/img/profile.jpg";
import homeImg from "../../resources/vectors/Home.svg";
import categoryImg from "../../resources/vectors/Category.svg";
import statisticImg from "../../resources/vectors/Chart.svg";
import documentImg from "../../resources/vectors/Document.svg";
import settingsImg from "../../resources/vectors/Setting.svg";
import logoutImg from "../../resources/vectors/Logout.svg";
import axios from "axios";
import { BaseUrl } from "../../index";

const Nav = () => {
  const { userAuth } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    img: "",
  });
  const [fetch, setFetch] = useState({
    pending: false,
    fetched: false,
  });

  useEffect(() => {
    console.log(6);
    if (!fetch.pending && !fetch.fetched) {
      setFetch((prev) => {
        return { pending: true, fetched: prev.fetched };
      });
      axios.get("/api/user/").then((res) => {
        setUserInfo({
          username: res.data.userName,
          img: BaseUrl + "/user/profile_images/" + res.data.profileImage,
        });
        setFetch((prev) => {
          return { pending: prev.pending, fetched: true };
        });
      });
    }
  }, [fetch.fetched, fetch.pending, setUserInfo, userAuth]);

  return (
    <nav className="nav">
      <div className="info">
        <img src={(userInfo && userInfo.img) || null} alt="" />
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
          <Link to="/logout" params={{ logout: true }} className="link">
            <img src={logoutImg} alt="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
