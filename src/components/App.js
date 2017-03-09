import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <RaisedButton label="Default" />
            <div>header</div>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
