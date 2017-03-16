import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, loadStocks, deleteStock } from "./../reducers/stockReducer";
import { bindActionCreators } from "redux";
import Stock from "./../components/Stock_show";
import StockEdit from './Stock_insert'


class Stocks extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fetching: false
    }
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onEditStock = this.onEditStock.bind(this)
  }

  componentDidUpdate() {
    if (!this.state.fetching && this.props.user ) {
      this.setState({fetching: true})
      this.props.loadStocks(this.props.user);
    }
  }

  onDeleteClick(stockId) {
    this.props.deleteStock(stockId, this.props.user)
  }

  onEditStock(stock) {
    console.log('selectStock', stock)
    this.props.selectStock(stock)
  }


  render() {
    const authenticated = this.props.user && this.props.user.providerData
    let result = ''
    if (authenticated) {
      result =
        <div>
          <Stock
            stocks={this.props.stocks}
            user={this.props.user}
            editStock={this.onEditStock}
            deleteStock={this.onDeleteClick} />
          <StockEdit />
        </div>
    } else {
      result = <div>You have to login first</div>
    }
    return result
  }

}

Stocks.propTypes = {};
Stocks.defaultProps = {};

function mapStateToProps(state) {
  return {
    stocks: state.stocks.stocks,
    user: state.auth.user
  }

}

function mapDiscpatchToProps(dispatch) {
  return bindActionCreators({selectStock, loadStocks, deleteStock}, dispatch);
}

export default connect(mapStateToProps, mapDiscpatchToProps)(Stocks);
