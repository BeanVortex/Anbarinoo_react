import React from "react";
import "./Recents.scss";
import Recent from "./recent/Recent";
import sampleImage from "../../../resources/img/product.jpg";

const Recents = () => {
  let arr = [
    {
      id: 0,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
    {
      id: 1,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
    {
      id: 2,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
    {
      id: 3,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
    {
      id: 4,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
    {
      id: 5,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
    {
      id: 6,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
    {
      id: 7,
      title: "گلکسی اس 21 الترا",
      stock: "365",
      buyPrice: "50",
      sellPrice: "52",
      img: sampleImage,
      colors: ["#FF8A65", "#5BC0BE", "#97ACA4"],
    },
  ];
  let recents = arr.map((p) => {
    return <Recent key={p.id} data={p} />;
  });

  return (
    <div className="recents">
      <div className="title">
        <h2>محصولات اخیر</h2>
      </div>
      <div className="products">{recents}</div>
    </div>
  );
};

export default Recents;
