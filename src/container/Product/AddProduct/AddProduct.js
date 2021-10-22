import React from "react";
import AddImage from "./AddImage/AddImage";
import image from "../../../resources/vectors/Image.svg";
import "./AddProduct.scss";
import { ToastContainer } from "react-toastify";

const AddProduct = () => {
  let imageUrls = [];
  let images = Array.apply(null, Array(5)).map((_x, i) => {
    return <AddImage imageUrls={imageUrls} key={i} index={i} image={image} />;
  });


  return (
    <div className="add-product">
      <div className="add-product-images">{images}</div>
      <div className="add-product-content"></div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
