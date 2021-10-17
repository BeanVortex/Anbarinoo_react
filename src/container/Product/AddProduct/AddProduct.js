import React, { useRef } from "react";
import AddImage from "./AddImage/AddImage";
import image from "../../../resources/vectors/Image.svg";
import "./AddProduct.scss";

const AddProduct = () => {
  let images = Array.apply(null, Array(5)).map((x, i) => {
    return (
      <AddImage
        key={i}
        index={i}
        image={image}
        clickHandler={() => clickHandler(i)}
      />
    );
  });

  const showImage = (file) => {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (file) {
      if (validExtensions.includes(file.type)) {
        let fr = new FileReader();
        fr.onload = () => {
          const fileURL = fr.result;
          const img = document.querySelector(".add-image-card img");
          img.classList.add("make-big");
          img.setAttribute("src", fileURL);
        };
        fr.readAsDataURL(file);
      } else {
        alert("فایل درست نیست");
      }
    }
  };

  const clickHandler = (key) => {
    console.log(images[key]);
    // const inputElement = images.find(key).children[1];
    // if (inputElement.current) {
    //   inputElement.current.click();
    //   inputElement.current.onchange = (e) => {
    //     showImage(e.target.files[0]);
    //   };
    // }
  };

  return (
    <div className="add-product">
      <div className="add-product-images">{images}</div>
      <div className="add-product-content"></div>
    </div>
  );
};

export default AddProduct;
