import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import stockReducer from './stockReducer'
import authReducer from './authReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  router: routerReducer,
  stocks: stockReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;