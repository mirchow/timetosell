import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Stocks from './containers/Stocks/Stocks'
import Login from './containers/Login/Login'
import Logout from './containers/Logout/Logout'
import InsertStock from './containers/Stocks/components/EditStock/EditStock'
import Auth from './containers/Login/components/Auth/Auth'
import NotFound from './containers/NotFound/NotFound'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Stocks} />
    <Route path='/login' component={Login} />
    <Route path='/addStock' component={InsertStock} />
    <Route path='/logout' component={Logout} />
    <Route path='/auth' component={Auth} />
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
