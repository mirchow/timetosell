import _ from "lodash";
import { firebaseDB } from "./../firebase";

// TYPES
export const SELECT_STOCK = 'SELECT_STOCK';
export const UPDATE_STOCKS = 'UPDATE_STOCKS';

// REDUCERS
const INITIAL_STATE = {
  stocks: []
};

// const user = '/users/jMa0kEgnUQdxn4rNDTGsW6gB5uG2';

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {

    case UPDATE_STOCKS:
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
      return {
        stocks: [...state.stocks, {...action.payload}]
      };
    default:
      return state;
  }


}

// ACTIONS

export function selectStock(stock) {
  return {
    type: SELECT_STOCK,
    payload: {
      id: stock.id + '1',
      name: stock.name
    }
  };
}

function convertToArray(objGroup) {
  const newArray = []
  if (!objGroup) {
    return newArray
  }
  _.forEach(objGroup, (eachObj, index) => {
    eachObj.id = index
    newArray.push(eachObj)
  })
  return newArray
}

export function updateStocks(userID) {
  return dispatch => {
    firebaseDB.ref(`users/${userID}`).on('value', snapshot => {
      const stockArray = convertToArray(snapshot.val().stocks)
      dispatch({
        type: UPDATE_STOCKS,
        stocks: stockArray
      });
    });
  };
}

export function saveStock(stock, userID) {
  console.log('saveStock', stock, userID)
  return dispatch => {
    firebaseDB.ref(`users/${userID}/stocks`).push().set({
      symbol: stock.symbol,
      purchasePrice: stock.purchasePrice
    });
  }
}

export function deleteStock(stockID, userID) {
  console.log('delete Stock', stockID, userID)
  return dispatch => {
    firebaseDB.ref(`users/${userID}/stocks/${stockID}`).remove();
  }
}


