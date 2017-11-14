import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../components/Header'
import { checkUserAuth } from '../reducers/authReducer'
import Login from './Login'
import Logout from './Logout'
import InsertStock from './EditStock'
import Auth from './Auth'
import Stocks from './Stocks'

const container_style = {
  fontFamily: "'Roboto', sans-serif"
}

export class App extends Component {
  componentWillMount() {
    this.props.checkUserAuth()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={container_style}>
          <Header router={this.props.router} user={this.props.user} />
          <Switch>
            <Route exact path="/" component={Stocks} />
            <Route path="/login" component={Login} />
            <Route path="/addStock" component={InsertStock} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = store => ({
  user: store.auth.user
})

export default connect(mapStateToProps, { checkUserAuth })(App)
