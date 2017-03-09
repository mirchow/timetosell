import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Stocks from './containers/stocks'
import Login from './containers/Login'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Stocks}/>
    <Route path="/login" component={Login} />
  </Route>
)