import { applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = applyMiddleware(thunk, logger())

const store = createStore(
  reducers,
  compose (
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store