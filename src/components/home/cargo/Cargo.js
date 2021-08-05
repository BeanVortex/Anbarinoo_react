import React, { Component } from "react";
//import "./Cargo.scss";

class Cargo extends Component {
  render() {
    let img = null;
    if (this.props.sent) img = "../../../resources/vectors/Upload.svg";
    else if (this.props.received)
      img = "../../../resources/vectors/Download.svg";

    return (
      <div>
        <div className="parent">
          <div className="icon-box">
            <img className="icon" src={img} alt="" />
          </div>
          <h5>{this.props.title}</h5>
          <p>{this.props.date}</p>
        </div>
      </div>
    );
  }
}
export default Cargo;
