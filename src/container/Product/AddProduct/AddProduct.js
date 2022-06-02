import React, { useEffect, useRef, useState } from "react";
import AddImage from "./AddImage/AddImage";
import image from "../../../resources/vectors/Image.svg";
import "./AddProduct.scss";
import { ToastContainer } from "react-toastify";
import { Button, Form, InputGroup } from "react-bootstrap";
import AddCategoryModal from "./AddCategory/AddCategoryModal";
import axios from "axios";
import { getByUser_CategoryUrl, save_ProductUrl } from "../../../utils/ApiUrls";
import { toastError, toastSuccess, toastWarn } from "../../../utils/ToastUtil";
import Helmet from "react-helmet";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [addCatShow, setAddCatShow] = useState(false);
  const [isNewCatAdded, setIsNewCatAdded] = useState(false);

  const [selectedCatId, setSelectedCatId] = useState(null);
  const nameInput = useRef();
  const buyPriceInput = useRef();
  const countInput = useRef();
  const descriptionInput = useRef();

  const imageUrls = useRef([]);
  let images = Array.apply(null, Array(5)).map((_x, i) => {
    return <AddImage imageUrls={imageUrls} key={i} index={i} image={image} />;
  });

  useEffect(() => {
    axios.get(getByUser_CategoryUrl).then((res) => {
      setCategories(
        res.data.categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))
      );
    });
  }, [isNewCatAdded]);

  const newCategoryHandler = () => setAddCatShow(true);

  const changeCatHandler = (e) => {
    const catId = e.target.value;
    setSelectedCatId(catId);
  };

  const saveProductHandler = () => {
    const data = new FormData();
    data.append("name", nameInput.current.value);
    data.append("price", buyPriceInput.current.value);
    data.append("description", descriptionInput.current.value);
    data.append("totalCount", countInput.current.value);
    data.append("category", selectedCatId);

    for (const key of imageUrls.current) {
      // const singleFileSize =
      //   Math.round((key.size * 100) / Math.pow(10, 6)) / 100;
      data.append("files", key);
    }

    for (const entry of data.entries()) {
      if (!entry[1] || entry[1] === "null") {
        toastWarn("تمام موارد را پر کنید");
        return;
      }
    }

    axios({
      url: save_ProductUrl,
      method: "POST",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        toastSuccess("با موفقیت ذخیره شد");
      })
      .catch((err) => {
        toastError(" مشکلی پیش آمد" + err);
      });
  };

  return (
    <div className="add-product">
      <Helmet>
        <title>محصول جدید</title>
      </Helmet>
      <div className="add-product-images">{images}</div>
      <div className="add-product-content">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="d-flex flex-row-reverse p-1">
            <Form.Control
              type="text"
              className="text-end ms-4 w-50"
              placeholder="نام محصول"
              ref={nameInput}
            />
            <Form.Control
              type="number"
              className="text-end w-50"
              placeholder="تعداد محصول "
              ref={countInput}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-row-reverse mt-3 p-1">
            <InputGroup className="ms-1 w-100 ">
              <InputGroup.Text id="currency_id">تومان</InputGroup.Text>
              <Form.Control
                type="number"
                ref={buyPriceInput}
                className="text-end "
                placeholder="قیمت خرید"
                aria-describedby="currency_id"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center flex-row-reverse mt-3 p-1">
            <Form.Control
              ref={descriptionInput}
              className="text-end mw-100 "
              style={{ resize: "vertical" }}
              rows="5"
              as="textarea"
              placeholder="توضیحات"
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-center flex-row-reverse mt-3 p-1">
            <select
              value={selectedCatId ? selectedCatId : "انتخاب دسته"}
              onChange={changeCatHandler}
              className="form-select form-select-sm text-end w-50 ms-4"
            >
              <option disabled value="انتخاب دسته">
                انتخاب دسته
              </option>
              {categories}
            </select>
            <Button variant="secondary" onClick={newCategoryHandler}>
              دسته جدید
            </Button>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center flex-row-reverse mt-5 mb-3">
            <Button
              type="submit"
              variant="success"
              className="w-50"
              onClick={saveProductHandler}
            >
              ذخیره
            </Button>
          </Form.Group>
        </Form>
      </div>
      {addCatShow ? (
        <AddCategoryModal
          setAddCatShow={setAddCatShow}
          setIsNewCatAdded={setIsNewCatAdded}
        />
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
