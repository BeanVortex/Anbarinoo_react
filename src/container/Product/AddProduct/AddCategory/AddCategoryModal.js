import axios from "axios";
import { debounce } from "debounce";
import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { save_CategoryUrl } from "../../../../utils/ApiUrls";
import {
  toastError,
  toastSuccess,
  toastWarn,
} from "../../../../utils/ToastUtil";
import "./AddCategoryModal.scss";

const AddCategoryModal = (props) => {
  const [name, setName] = useState("");

  const closeModal = () => props.setAddCatShow(false);
  const changeNameHandler = debounce((e) => setName(e.target.value), 300);
  const saveCatHandler = () => {
    if (!name) {
      toastWarn("نامی برای دسته انتخاب کنید");
      return;
    }
    axios
      .post(save_CategoryUrl, { name })
      .then(() => {
        toastSuccess("با موفقیت دسته جدید اضافه شد");
        props.setAddCatShow(false);
        props.setIsNewCatAdded(true);
      })
      .catch(() => {
        toastError("مشکلی رخ داد");
      });
  };

  return (
    <Fragment>
      <div className="add-category">
        <div className="add-category-back" onClick={closeModal}></div>

        <div className="add-category-container">
          <div className="add-category-header">
            <p className="me-4">دسته جدید</p>
            <button className="btn-close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="add-category-separator"></div>
          <div className="add-category-body mt-2">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="d-flex flex-row-reverse p-1">
                <Form.Control
                  type="text"
                  className="text-end w-100"
                  placeholder="نام دسته"
                  onChange={changeNameHandler}
                />
              </Form.Group>

              <Form.Group className="d-flex justify-content-center flex-row-reverse mt-2 mb-3">
                <Button
                  type="submit"
                  variant="success"
                  className="w-50"
                  onClick={saveCatHandler}
                >
                  ذخیره
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;
