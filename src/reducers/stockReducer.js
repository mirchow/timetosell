import _ from 'lodash'
import { firebaseDB } from './../firebase'

// TYPES
const LOAD_STOCKS = 'LOAD_STOCKS'
const SELECT_STOCK = 'SELECT_STOCK'
const SHOW_ADD_STOCK = 'SHOW_ADD_STOCK'

// REDUCERS
const INITIAL_STATE = {
  stocks: [],
  loaded: false,
  selectedStock: {},
  showAddStock: false
}

const Stocks = firebaseDB.ref('/users/jMa0kEgnUQdxn4rNDTGsW6gB5uG2')

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_STOCKS:
      return {
        ...state,
        loaded: true,
        stocks: action.stocks
      }
    case SELECT_STOCK:
      return {
        ...state,
        selectedStock: action.selectedStock
      }
    // case SELECT_STOCK:
    // if (_.some( state.   stocks, {       id: action.payload.id })) {
    //       return state;
    //   }
    // return {//stocks: [...state.stocks, {... action.payload}]
    //   };
    case SHOW_ADD_STOCK:
      return {
        ...state,
        showAddStock: action.showAddStock
      }
    default:
      return state
  }
}

// ACTIONS
// export function selectStock(stock) {
//   return {
//     type: SELECT_STOCK,
//     payload: {
//       id: stock.id + '1',
//       name: stock.name
//     }
//   };
// }

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

export function loadStocks(user) {
  return dispatch => {
    firebaseDB.ref(`users/${user.uid}`).on('value', snapshot => {
      const stockArray = convertToArray(snapshot.val().stocks)
      dispatch({
        type: LOAD_STOCKS,
        stocks: stockArray
      })
    })
  }
}

export function selectStock(stock) {
  return {
    type: SELECT_STOCK,
    selectedStock: stock
  }
}

export function clickShowAddStock(value) {
  return {
    type: SHOW_ADD_STOCK,
    showAddStock: value
  }
}

export function saveStock(stock, user) {
  return dispatch => {
    Stocks.on('value', snapshot => {
      dispatch({
        type: LOAD_STOCKS,
        stocks: snapshot.val().stocks
      })
    })
  }

  fetch('https://us-central1-time2sell-e2178.cloudfunctions.net/updateStocks')
}

export function deleteStock(stockID, user) {
  return dispatch => {
    firebaseDB.ref(`users/${user.uid}/stocks/${stockID}`).remove()
  }
}
