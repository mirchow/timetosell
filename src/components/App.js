import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from './Header'

const container_style = {
  fontFamily: "'Roboto', sans-serif"
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={container_style}>
            <Header />
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
