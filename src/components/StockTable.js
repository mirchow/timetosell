import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconDelete from 'material-ui/svg-icons/action/delete'
import IconEdit from 'material-ui/svg-icons/editor/mode-edit'
import moment from 'moment'

function toFixed (num, precision) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision)
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
    <Table style={{ margin: '10 em', align: 'left' }}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow selectable={false}>
          <TableHeaderColumn style={numberStyle}>Symbol</TableHeaderColumn>
          <TableHeaderColumn className='hidden-xs' style={numberStyle}>Purchase<br />Price</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Last<br />Price</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Gain</TableHeaderColumn>
          <TableHeaderColumn className='hidden-xs' style={numberStyle}>Highest<br />Price</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Since<br />Highest</TableHeaderColumn>
          <TableHeaderColumn className='hidden-xs' style={numberStyle}>Treshold</TableHeaderColumn>
          <TableHeaderColumn className='hidden-xs' style={numberStyle}>Updated</TableHeaderColumn>
          <TableHeaderColumn style={numberStyle}>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover>
        {renderStocks(stocks, editStock, deleteStock)}
      </TableBody>
    </Table>
  )
}

function renderStocks (stocks, editStock, deleteStock) {
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
      <TableRow key={stock.symbol} selectable={false} >
        <TableRowColumn style={numberStyle}>{stock.symbol}</TableRowColumn>
        <TableRowColumn className='hidden-xs' style={numberStyle}>{toFixed(stock.purchasePrice, 2)}</TableRowColumn>
        <TableRowColumn style={numberStyle}>{stock.lastPrice}</TableRowColumn>
        <TableRowColumn style={gainColorStyle}>{stock.gain}</TableRowColumn>
        <TableRowColumn className='hidden-xs' style={numberStyle}>{stock.highestPrice}</TableRowColumn>
        <TableRowColumn style={thresholdStyle}>{stock.currentTreshold} %</TableRowColumn>
        <TableRowColumn className='hidden-xs' style={numberStyle}>{stock.threshold} %</TableRowColumn>
        <TableRowColumn className='hidden-xs' style={numberStyle}>{moment(stock.lastPriceTimeStamp).format('H:mm:ss')}</TableRowColumn>
        <TableRowColumn style={numberStyle}>
          <IconEdit onClick={() => editStock(stock)} />&nbsp;
          <IconDelete onClick={() => deleteStock(stock.id)} />
        </TableRowColumn>
      </TableRow>
    )
  })
}

Stock.propTypes = {
  stocks: React.PropTypes.arrayOf(React.PropTypes.string),
  editStock: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired
}
Stock.defaultProps = {}

export default Stock
