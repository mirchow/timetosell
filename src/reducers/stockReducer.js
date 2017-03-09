import _ from "lodash";

// TYPES
export const SELECT_STOCK = 'SELECT_STOCK';
export const FETCH_STOCKS = 'FETCH_STOCKS';

// REDUCERS
const INITIAL_STATE = {
  stocks: [
    {id: 'IBM', name: 'IBM name'},
    {id: 'F', name: 'Ford'},
    {id: 'BAC', name: 'Bank of America'},
    {id: 'NVDA', name: 'NVidia'}
  ]
}

export default function (state = INITIAL_STATE, action) {

  // console.log(`reducer-> action type: ${action.type} action.payload: ${action.payload} state: ${state}`);

  switch (action.type) {

    case FETCH_STOCKS:
      return state;
    case SELECT_STOCK:
      if (_.some(state.stocks, {id: action.payload.id})) {
        console.log('_some', true);
        return state;
      }

      // return Object.assign({}, state, {
      //   stocks: [...state.stocks,
      //     {
      //       id: action.payload.id + '1',
      //       name: action.payload.name
      //     }
      //   ]
      // });

      // return {stocks: [...state.stocks, {id: action.payload.id + '1', name: action.payload.name}]}
      return {stocks: [...state.stocks, {...action.payload}]}
    default:
      return state;
  }


}

// ACTIONS

export function selectStock(stock) {
  console.log(`action selectStock: stock ${stock.id} stock.name ${stock.name}`);

  return {
    type: SELECT_STOCK,
    payload: {
      id: stock.id + '1',
      name: stock.name
    }
  };
}

export function fetchStocks() {

  return {
    type: FETCH_STOCKS,
    payload: null
  }
}

