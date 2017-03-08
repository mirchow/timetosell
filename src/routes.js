import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Stocks from './containers/stocks'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Stocks}/>
  </Route>
)