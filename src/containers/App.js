import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../components/Header'
import { checkUserAuth } from '../reducers/authReducer'
import { bindActionCreators } from 'redux'

const containerStyle = {
  fontFamily: "'Roboto', sans-serif"
}

class App extends Component {
  componentWillMount () {
    this.props.checkUserAuth()
  }

  render () {
    return (
      <MuiThemeProvider>
        <div style={containerStyle}>
          <Header router={this.props.router} user={this.props.user} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    checkUserAuth
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
