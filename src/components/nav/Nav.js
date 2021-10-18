import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Nav.scss";
import homeImg from "../../resources/vectors/Home.svg";
import plusImg from "../../resources/vectors/Plus.svg";
import categoryImg from "../../resources/vectors/Category.svg";
import statisticImg from "../../resources/vectors/Chart.svg";
import documentImg from "../../resources/vectors/Document.svg";
import settingsImg from "../../resources/vectors/Setting.svg";
import logoutImg from "../../resources/vectors/Logout.svg";
import Item from "./Item/Item";

const itemsData = [
  {
    img: homeImg,
    title: "خانه",
    path: "/",
  },
  {
    img: plusImg,
    title: "محصول جدید",
    path: "/new-product",
  },
  {
    img: categoryImg,
    title: "دسته ها",
    path: "/category",
  },
  {
    img: statisticImg,
    title: "آمار و ارقام",
    path: "/statistic",
  },
  {
    img: documentImg,
    title: "گزارشات",
    path: "/report",
  },
  {
    img: settingsImg,
    title: "تنظیمات",
    path: "/settings",
  },
  {
    img: logoutImg,
    title: "خروج از حساب",
    path: "/logout",
  },
];

const Nav = () => {
  const { userInfo } = useContext(AuthContext);

  const items = itemsData.map((_x, i) => (
    <Item data={itemsData[i]} />
  ));

  return (
    <nav className="nav">
      <div className="info">
        <img src={(userInfo && userInfo.profile) || null} alt="" />
        <h3>{(userInfo && userInfo.username) || ""}</h3>
      </div>

      <ul>{items}</ul>
    </nav>
  );
};

export default Nav;
