import React from "react";
import Loader from "react-loaders";
import "./Load.scss";

const Load = () => {
  return (
    <div className="loader-container">
      <Loader type="ball-grid-pulse" />
    </div>
  );
};

export default Load;
