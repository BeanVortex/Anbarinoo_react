import React from "react";
import "./Home.scss";

import Header from "../../components/home/header/Header";
import Recents from "../../components/home/recents/Recents";

const Home = () => {
  return (
    <div className="container">
      <div className="body">
        <Header />
      <Recents />
      </div>
    </div>
  );
};

export default Home;
