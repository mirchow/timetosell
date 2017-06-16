import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, loadStocks, deleteStock, clickShowAddStock } from "../../reducers/stockReducer";
import { bindActionCreators } from "redux";
import Stock from "../../components/StockTable";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import StockAdd from "./components/EditStock/EditStock";
import { Link } from 'react-router'

const buttonStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-end'
}


class Stocks extends Component {

  constructor(props) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onEditStock = this.onEditStock.bind(this)
  }

  state = {
    fetching: false
  }

  componentWillMount() {
    if (!this.state.fetching && this.props.user) {
      this.props.loadStocks(this.props.user);
      this.setState({fetching: true})
    }
  }

  componentDidUpdate() {
    if (!this.state.fetching && this.props.user) {
      this.props.loadStocks(this.props.user);
      this.setState({fetching: true})
    }
  }

  onDeleteClick(stockId) {
    this.props.deleteStock(stockId, this.props.user)
  }

  onEditStock(stock) {
    this.props.selectStock(stock)
  }


  render() {
    const {user} = this.props;
    const authenticated = user && user.providerData
    let result = ''
    if (authenticated) {
      result =
        <div>
        <div style={buttonStyle}>
          <Stock
            stocks={this.props.stocks}
            user={this.props.user}
            editStock={this.onEditStock}
            deleteStock={this.onDeleteClick}/>
        </div>
        <div style={buttonStyle}>
          {!this.props.showAddStock ?
            <FloatingActionButton
              onClick={ () => {
                this.props.clickShowAddStock(true) }} >
              <ContentAdd />
            </FloatingActionButton>
            : ''
          }
        </div>
          {this.props.showAddStock ? <StockAdd /> : ''}
        </div>
    } else {
      result =
        <div style={{margin: 20}}>
          You have to <Link to="/login">Login</Link> first
        </div>
    }
    return result
  }

}

Stocks.defaultProps = {};

function mapStateToProps(state) {
  return {
    stocks: state.stocks.stocks,
    user: state.auth.user,
    showAddStock: state.stocks.showAddStock
  }

}

function mapDiscpatchToProps(dispatch) {
  return bindActionCreators({
    selectStock,
    loadStocks,
    deleteStock,
    clickShowAddStock
  }, dispatch);
}

export default connect(mapStateToProps, mapDiscpatchToProps)(Stocks);
