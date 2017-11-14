import { combineReducers } from 'redux'
import stockReducer from './stockReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  stocks: stockReducer,
  auth: authReducer
});

export default rootReducer;