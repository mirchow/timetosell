import _ from "lodash";
import { FETCH_STOCKS, SELECT_STOCK } from "./../actions";

const INITIAL_STATE = {
  stocks: [
    {id: 'IBM', name: 'IBM name'},
    {id: 'F', name: 'Ford'},
    {id: 'BAC', name: 'Bank of America'},
    {id: 'NVDA', name: 'NVidia'}
  ]
};

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


