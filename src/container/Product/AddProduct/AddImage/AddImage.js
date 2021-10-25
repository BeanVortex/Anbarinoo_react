import React, { useState, useRef } from "react";
import "./AddImage.scss";
import { toastWarn } from "../../../../utils/ToastUtil";
import Compressor from "compressorjs";

const AddImage = (props) => {
  const inputElement = useRef(null);
  const [imageState, setImageState] = useState({ url: "", isBig: false });

  const showImage = (file) => {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (file) {
      if (validExtensions.includes(file.type)) {
        new Compressor(file, {
          mimeType: "image/jpeg",
          success: (compressedFile) => {
            props.imageUrls.current[props.index] = compressedFile;
            let fr = new FileReader();
            fr.onload = () => {
              const fileURL = fr.result;
              setImageState({ url: fileURL, isBig: true });
            };
            fr.readAsDataURL(compressedFile);
          },
        });
      } else {
        toastWarn(
          "فایل درست نیست باید به این فرمت ها باشد\n" +
            validExtensions.join(" ").split("image/").join(" ")
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
