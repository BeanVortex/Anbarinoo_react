import React from "react";
import "./Home.scss";

import Nav from "../../components/nav/Nav";
import Header from "../../components/home/header/Header";
import Recents from "../../components/home/recents/Recents";

const Home = () => {
  return (
    <div className="container">
      <Nav />
      <div className="body">
        <Header />
      <Recents />
      </div>
    </div>
  );
};

export default Home;
