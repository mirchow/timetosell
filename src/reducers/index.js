import { combineReducers } from 'redux';
import StockReducer from './stockReducer';

const rootReducer = combineReducers({
  //will be something like:
  // weather: WeatherReducer
  // state: (state = {}) => state
  stocks: StockReducer
});

export default rootReducer;