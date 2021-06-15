import React, { Component } from "react";

class Cargo extends Component {
  render() {
    return (
      <div>
        <div className="parent">
            <div className="icon-box">
                <div className="icon"/>
            </div>
            <h5>{this.props.title}</h5>
            <p>{this.props.date}</p>
        </div>
      </div>
    );
  }
}
export default Cargo;
