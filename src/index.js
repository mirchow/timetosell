import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './containers/App'
import store from './store'

/**
 * Material UI requirement
 * Needed for onTouchTap
 * more info - http://stackoverflow.com/a/34015469/988941
 */
injectTapEventPlugin()

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
