import React, { PropTypes } from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";

const Stock = ({stocks}) => {
  return (
      <Table >
        <TableHeader displaySelectAll={false} >
          <TableRow>
            <TableHeaderColumn>Symbol</TableHeaderColumn>
            <TableHeaderColumn>Last Traded Price</TableHeaderColumn>
            <TableHeaderColumn>Purchased Price</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {renderStocks(stocks)}
        </TableBody>
      </Table>
  );
};

function renderStocks(stocks) {
  return stocks && stocks.map(stock => {
      return (
        <TableRow key={stock.symbol} selectable={false}>
          <TableRowColumn>{stock.symbol}</TableRowColumn>
          <TableRowColumn>{stock.lastTradePriceOnly}</TableRowColumn>
          <TableRowColumn>{stock.purchasePrice}</TableRowColumn>
        </TableRow>
      )
    });
}


Stock.propTypes = {};
Stock.defaultProps = {};

export default Stock;
