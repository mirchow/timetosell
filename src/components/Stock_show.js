import React, { PropTypes } from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import FlatButton from 'material-ui/FlatButton';
import googleStocks from 'google-stocks';


const Stock = ({stocks, editStock, deleteStock}) => {
  return (
    <Table >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow selectable={false}>
          <TableHeaderColumn>Symbol</TableHeaderColumn>
          <TableHeaderColumn>Last Traded Price</TableHeaderColumn>
          <TableHeaderColumn>Purchased Price</TableHeaderColumn>
          <TableHeaderColumn>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        {renderStocks(stocks, editStock, deleteStock)}
      </TableBody>
    </Table>
  );
};

function renderStocks(stocks, editStock, deleteStock) {
  return stocks && stocks.map(stock => {
      return (
        <TableRow key={stock.symbol} selectable={false}>
          <TableRowColumn>{stock.symbol}</TableRowColumn>
          <TableRowColumn>{stock.lastPrice}</TableRowColumn>
          <TableRowColumn>{stock.purchasePrice}</TableRowColumn>
          <TableRowColumn>
            <FlatButton label="Edit" secondary={true} onClick={() => editStock(stock)} />
            <FlatButton label="Delete" secondary={true} onClick={() => deleteStock(stock.id)} />
          </TableRowColumn>
        </TableRow>
      )
    });
}


Stock.propTypes = {};
Stock.defaultProps = {};

export default Stock;
