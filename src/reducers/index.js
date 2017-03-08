import { combineReducers } from 'redux';
import StockReducer from './stockReducer';

const rootReducer = combineReducers({
  stocks: StockReducer
});

export default rootReducer;