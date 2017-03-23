import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import store from './store'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './index.css'

/**
 * Material UI requirement
 * Needed for onTouchTap
 * more info - http://stackoverflow.com/a/34015469/988941
 */
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
