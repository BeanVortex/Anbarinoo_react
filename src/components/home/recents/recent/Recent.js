import React from "react";
import "./Recent.scss";

const Recent = (props) => {
  let colorDiv = [<div style={{ background: "white" }}></div>];
  colorDiv = props.data.colors.map((color, i) => {
    return (
      <div key={i} style={{ background: color }} className="color-div"></div>
    );
  });

  console.log(props);
  const stock = `موجودی : ${props.data.stock}`;
  const buyPrice = `قیمت خرید : ${props.data.buyPrice}`;
  const sellPrice = `قیمت فروش : ${props.data.sellPrice}`;
  return (
    <div className="product">
      <div className="img">
        <img src={props.data.img} alt="productImage" />
      </div>
      <div className="content">
        <div className="title">
          <h4>{props.data.title}</h4>
          <div className="colors">{colorDiv}</div>
        </div>
        <div className="body">
          <p className="stock">{stock}</p>
          <p className="buy-price">{buyPrice}</p>
          <p className="sell-price">{sellPrice}</p>
        </div>
        <button className="buy-btn">ثبت سفارش</button>
      </div>
    </div>
  );
};

export default Recent;
