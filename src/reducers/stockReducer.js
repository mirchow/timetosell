import _ from "lodash";
import { firebaseDbRef, firebaseDb } from "./../firebase";


// TYPES
export const SELECT_STOCK = 'SELECT_STOCK';
export const FETCH_STOCKS = 'FETCH_STOCKS';

// REDUCERS
const INITIAL_STATE = {
  stocks: []
};

const Stocks = firebaseDbRef.child('/users/jMa0kEgnUQdxn4rNDTGsW6gB5uG2');


export default function (state = INITIAL_STATE, action) {

  // console.log(`reducer-> action type: ${action.type} action.payload: ${action.payload} state: ${state}`);

  switch (action.type) {

    case FETCH_STOCKS:
      const aaa = {...state,
        stocks: action.stocks};
      console.log('reducer-fetchstocks', aaa);
      return {
        ...state,
        stocks: action.stocks
      }
    case SELECT_STOCK:
      if (_.some(state.stocks, {id: action.payload.id})) {

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
      return {stocks: [...state.stocks, {...action.payload}]};
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
  return dispatch => {
    Stocks.on('value', snapshot => {
      console.log('snapshot:', snapshot.val().stocks);
      dispatch({
        type: FETCH_STOCKS,
        stocks: snapshot.val().stocks
      });
    });
  };

}

