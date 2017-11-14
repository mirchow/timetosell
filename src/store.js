import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware = applyMiddleware(thunk)

const store = createStore(
  reducers,
  compose (
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store