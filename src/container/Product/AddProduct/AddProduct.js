import React from "react";
import AddImage from "./AddImage/AddImage";
import image from "../../../resources/vectors/Image.svg";
import "./AddProduct.scss";
import { ToastContainer } from "react-toastify";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";

const AddProduct = () => {
  let imageUrls = [];
  let images = Array.apply(null, Array(5)).map((_x, i) => {
    return <AddImage imageUrls={imageUrls} key={i} index={i} image={image} />;
  });

  return (
    <div className="add-product">
      <div className="add-product-images">{images}</div>
      <div className="add-product-content">
        <Form>
          <Form.Group className="d-flex flex-row-reverse">
            <Form.Control
              type="text"
              className="text-end ms-4 w-50"
              placeholder="نام محصول"
            />
            <Form.Control
              type="number"
              className="text-end w-50"
              placeholder="تعداد محصول "
            />
          </Form.Group>

          <Form.Group className="d-flex flex-row-reverse mt-3">
            <InputGroup className="ms-4 w-50">
              <InputGroup.Text id="currency_id">تومان</InputGroup.Text>
              <Form.Control
                type="number"
                className="text-end"
                placeholder="قیمت خرید"
                aria-describedby="currency_id"
              />
            </InputGroup>

            <InputGroup className="w-50">
              <InputGroup.Text id="currency_id">تومان</InputGroup.Text>
              <Form.Control
                type="number"
                className="text-end"
                placeholder="قیمت فروش"
                aria-describedby="currency_id"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center flex-row-reverse mt-3">
            <Form.Control
              className="text-end"
              as="textarea"
              placeholder="توضیحات"
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-center flex-row-reverse mt-3">
            <Dropdown className="ms-2">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                انتخاب دسته{" "}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* todo render by server data */}
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="secondary">دسته جدید</Button>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center flex-row-reverse mt-5 mb-3">
            <Button variant="success" className="w-50">
              ذخیره
            </Button>
          </Form.Group>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
