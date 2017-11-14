import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import stockReducer from './stockReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  stocks: stockReducer,
  auth: authReducer,
  form: formReducer
})

export default rootReducer
