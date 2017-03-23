import React, { PropTypes } from "react"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import IconDelete from 'material-ui/svg-icons/action/delete'
import IconEdit from 'material-ui/svg-icons/editor/mode-edit'
import moment from 'moment'

function toFixed( num, precision ) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

const numberStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  textAlign: 'right'
}
const numberStyleRed = {
  color: 'red',
  paddingLeft: 10,
  paddingRight: 10,
  textAlign: 'right'
}

const Stock = ({stocks, editStock, deleteStock}) => {
  return (
    <Table style={{margin: 10, align: 'center'}}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow selectable={false}>
          <TableHeaderColumn>Symbol</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Purchase<br/>Price</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Last<br/>Price</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Gain</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Highest<br/>Price</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Since<br/>Highest</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Treshold</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Updated</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        {renderStocks(stocks, editStock, deleteStock)}
      </TableBody>
    </Table>
  )
}

function renderStocks(stocks, editStock, deleteStock) {
  return stocks && stocks.map(stock => {
      const thresholdStyle = stock.currentTreshold > stock.threshold ? numberStyleRed : numberStyle
      let gainColor = 'black'
      if (stock.gain > 5) {
        gainColor = 'green'
      } else if (stock.gain < 0) {
        gainColor = 'red'
      }
      const gainColorStyle = Object.assign({}, numberStyle)
      gainColorStyle.color = gainColor

      return (
        <TableRow key={stock.symbol} selectable={false} style={{}}>
          <TableRowColumn>{stock.symbol}</TableRowColumn>
          <TableRowColumn style={numberStyle}>{toFixed(stock.purchasePrice, 2)}</TableRowColumn>
          <TableRowColumn style={numberStyle}>{stock.lastPrice}</TableRowColumn>
          <TableRowColumn style={gainColorStyle}>{stock.gain}</TableRowColumn>
          <TableRowColumn style={numberStyle}>{stock.highestPrice}</TableRowColumn>
          <TableRowColumn style={thresholdStyle}>{stock.currentTreshold} %</TableRowColumn>
          <TableRowColumn style={numberStyle}>{stock.threshold} %</TableRowColumn>
          <TableRowColumn style={numberStyle}>{moment(stock.lastPriceTimeStamp).format("H:mm:ss")}</TableRowColumn>
          <TableRowColumn>
            <IconEdit onClick={() => editStock(stock)} />&nbsp;&nbsp;
            <IconDelete onClick={() => deleteStock(stock.id)} />
          </TableRowColumn>
        </TableRow>
      )
    })
}


Stock.propTypes = {
  editStock: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired
}
Stock.defaultProps = {}

export default Stock
