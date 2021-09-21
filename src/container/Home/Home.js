import React, { Component } from "react";
import "./Home.scss";

import Nav from "../../components/nav/Nav";
import Header from "../../components/home/header/Header";
import Recents from "../../components/home/recents/Recents";

class Home extends Component {
  render() {
    return (
      <div>
        <Nav className="nav" />
        <Header className="header" />
        <Recents/>
        
      </div>
    );
  }
}

export default Home;
