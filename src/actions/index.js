export const SELECT_STOCK = 'SELECT_STOCK';
export const FETCH_STOCKS = 'FETCH_STOCKS';

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