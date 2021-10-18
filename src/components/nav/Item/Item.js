import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Item.scss";
const Item = (props) => {
  const [mouse, setMouse] = useState(false);
  const mouseOverHandler = () => {
    setMouse(true);
  };

  const mouseLeaveHandler = () => {
    setMouse(false);
  };

  return (
    <li>
      <Link
        to={props.data.path}
        className="link"
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <img src={props.data.img} alt="" />
      </Link>
      <div className={`hint ${mouse ? "showHint" : ""}`}>
        {props.data.title}
      </div>
    </li>
  );
};

export default Item;
