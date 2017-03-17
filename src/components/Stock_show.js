import React, { PropTypes } from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import IconDelete from "material-ui/svg-icons/action/delete";
import moment from "moment";

const Stock = ({stocks, editStock, deleteStock}) => {

  return (
    <Table >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow selectable={false}>
          <TableHeaderColumn>Symbol</TableHeaderColumn>
          <TableHeaderColumn>Purchase Price</TableHeaderColumn>
          <TableHeaderColumn>Last Price</TableHeaderColumn>
          <TableHeaderColumn>Gain</TableHeaderColumn>
          <TableHeaderColumn>Highest Price</TableHeaderColumn>
          <TableHeaderColumn>Since Highest</TableHeaderColumn>
          <TableHeaderColumn>Treshold</TableHeaderColumn>
          <TableHeaderColumn>Updated</TableHeaderColumn>
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
        <TableRow key={stock.symbol} selectable={false} style={{}}>
          <TableRowColumn>{stock.symbol}</TableRowColumn>
          <TableRowColumn>{stock.purchasePrice}</TableRowColumn>
          <TableRowColumn>{stock.lastPrice}</TableRowColumn>
          <TableRowColumn>{stock.gain}</TableRowColumn>
          <TableRowColumn>{stock.highestPrice}</TableRowColumn>
          <TableRowColumn>{stock.currentTreshold} %</TableRowColumn>
          <TableRowColumn>20%</TableRowColumn>
          <TableRowColumn>{moment(stock.lastPriceTimeStamp).format("H:mm:ss")}</TableRowColumn>
          <TableRowColumn>
            <IconDelete onClick={() => deleteStock(stock.id)}/>
          </TableRowColumn>
        </TableRow>
      )
    });
}


Stock.propTypes = {};
Stock.defaultProps = {};

export default Stock;
