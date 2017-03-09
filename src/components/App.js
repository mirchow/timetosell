import React, { Component } from "react"
import { connect } from 'react-redux'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import Header from './Header'

const container_style = {
  fontFamily: "'Roboto', sans-serif"
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={container_style}>
          <Header router={this.props.router} user={this.props.user} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(App)
