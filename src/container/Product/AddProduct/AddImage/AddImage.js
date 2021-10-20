import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "./AddImage.scss";

const AddImage = (props) => {
  const inputElement = useRef(null);
  const [imageState, setImageState] = useState({ url: "", isBig: false });

  const showImage = (file) => {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (file) {
      if (validExtensions.includes(file.type)) {
        let fr = new FileReader();
        fr.onload = () => {
          const fileURL = fr.result;
          setImageState({ url: fileURL, isBig: true });
        };
        fr.readAsDataURL(file);
      } else {
        console.log(Boolean(file));
        toast.warn(
          "فایل درست نیست باید به این فرمت ها باشد\n" +
            validExtensions.join(" ").split("image/").join(" "),
          {
            autoClose: 2000,
            closeButton: true,
            closeOnClick: true,
          }
        );
      }
    }
  };

  const clickHandler = () => {
    const input = inputElement.current;
    input.click();
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) showImage(file);
    };
  };

  return (
    <div className="add-image-card" onClick={clickHandler}>
      <img
        src={imageState.url ? imageState.url : props.image}
        className={imageState.isBig ? "make-big" : ""}
        alt=""
      />

      <input ref={inputElement} type="file" hidden />
    </div>
  );
};

export default AddImage;
