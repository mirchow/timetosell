import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Stocks from './containers/Stocks'
import Login from './containers/Login'
import Logout from './containers/Logout'
import InsertStock from './containers/Stock_insert'
import Auth from './containers/Auth'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Stocks}/>
    <Route path="/login" component={Login} />
    <Route path="/addStock" component={InsertStock}/>
    <Route path="/logout" component={Logout} />
    <Route path="/auth" component={Auth} />
  </Route>
)