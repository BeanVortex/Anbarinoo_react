import React, { Component } from "react";
import "./Cargo.scss";
import uploadImg from "../../../../resources/vectors/Upload.svg";
import downloadImg from "../../../../resources/vectors/Download.svg";

class Cargo extends Component {
  render() {
    let img = null;
    if (this.props.isSent) img = uploadImg;
    else img = downloadImg;


    return (
      <div className="parent">
        <div className="icon-box">
          <img className="icon" src={img} alt="" />
        </div>
        <div className="content">
          <h4>{this.props.data.title}</h4>
          <p>{this.props.data.date}</p>
        </div>
      </div>
    );
  }
}
export default Cargo;
