import React from "react";
import "./Recent.scss";

const Recent = (props) => {
  let colorDiv = [<div style={{ background: "white" }}></div>];
  colorDiv = props.data.colors.map((color, i) => {
    return (
      <div key={i} style={{ background: color }} className="color-div"></div>
    );
  });


  const stock = `موجودی : ${props.data.stock}`;
  const buyPrice = `قیمت خرید : ${props.data.buyPrice}`;
  return (
    <div className="product">
      <div className="img">
        <img src={props.data.img} alt="productImage" />
      </div>
      <div className="content">
        <div className="content-title">
          <h4>{props.data.title}</h4>
          <div className="colors">{colorDiv}</div>
        </div>
        <div className="content-body">
          <p className="content-body-stock">{stock}</p>
          <p className="content-body-buy-price">{buyPrice}</p>
          <p className="content-body-sell-price">
            قیمت فروش : <span>{props.data.sellPrice}</span>
          </p>
        </div>
        <div className="content-btn">
          <button>ثبت سفارش</button>
        </div>
      </div>
    </div>
  );
};

export default Recent;
