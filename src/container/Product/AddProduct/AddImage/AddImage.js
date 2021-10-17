import React, { useRef } from "react";
import "./AddImage.scss";

const AddImage = (props) => {
  const inputElement = useRef();
  return (
    <div className="add-image-card" onClick={props.clickHandler}>
      <img src={props.image} alt="" />
      <input ref={inputElement} type="file" hidden />
    </div>
  );
};

export default AddImage;
