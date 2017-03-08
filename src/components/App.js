import React, { Component } from "react";
import "./App.css";
import Stocks from "../containers/stocks";
import Title from "../containers/title";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Title/>
        <Stocks/>
      </div>
    );
  }
}

export default App;
