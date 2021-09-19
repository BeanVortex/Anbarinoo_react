import React, { useState } from "react";
import "./Header.scss";

const Header = () => {
  const [isSent, setIsSent] = useState(true);

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
          {" "}
          دریافت شده
        </button>
      </div>
      <div className="cargos"></div>
    </header>
  );
};

export default Header;
