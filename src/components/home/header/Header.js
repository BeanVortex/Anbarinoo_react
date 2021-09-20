import React, { useEffect, useState } from "react";
import "./Header.scss";
import Cargo from "./cargo/Cargo";
import axios from "axios";

const Header = () => {
  const [isSent, setIsSent] = useState(true);
  const [cargos, setCargos] = useState([]);

  const handleState = () => {
    const sentBtn = document.querySelector("button:nth-child(1)");
    const receivedBtn = document.querySelector("button:nth-child(2)");

    if (!isSent) {
      sentBtn.classList.add("active");
      receivedBtn.classList.remove("active");
      setIsSent(true);
    } else {
      sentBtn.classList.remove("active");
      receivedBtn.classList.add("active");
      setIsSent(false);
    }
  };

  let arr = [
    {
      title: "بسته شماره یک",
      date: Date.now(),
    },
    {
      title: "بسته شماره دو",
      date: Date.now(),
    },
    {
      title: "بسته شماره سه",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
    {
      title: "بسته شماره چهار",
      date: Date.now(),
    },
  ];

  let screenWidth = window.innerWidth;

  console.log(screenWidth);
  if (screenWidth > 1920) {
    arr = arr.slice(0, 15);
  } else if (screenWidth <= 1920 && screenWidth >= 1800) {
    arr = arr.slice(0, 15);
  } else if (screenWidth < 1800 && screenWidth >= 1440) {
    arr = arr.slice(0, 12);
  } else if (screenWidth < 1440 && screenWidth >= 1280) {
    arr = arr.slice(0, 9);
  } else if (screenWidth < 1280) {
    arr = arr.slice(0, 6);
  }

  const result = arr.map((obj, i) => (
    <Cargo data={obj} isSent={isSent} key={i} />
  ));
  return (
    <header className="header">
      <div className="profit-indicator">
        <h3>+18 %</h3>
        <p>این ماه</p>
      </div>
      <div className="receive-link">
        <button href="#" onClick={() => handleState(this)} className="active">
          ارسال شده
        </button>
        <button href="#" onClick={() => handleState(this)}>
          دریافت شده
        </button>
      </div>
      <div className="cargos">
        {result}
        <button className="more">بیشتر</button>
      </div>
    </header>
  );
};

export default Header;
