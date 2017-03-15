import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, updateStocks, deleteStock } from "./../reducers/stockReducer";
import { bindActionCreators } from "redux";
import Stock from "./../components/Stock_show";


class Stocks extends Component {


  constructor(props) {
    super(props)

    this.state = {
      fetching: false
    }
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidUpdate() {
    console.log('componentDidUpdate-OUT',!this.state.fetching, this.props.user !== null)
    if (!this.state.fetching && this.props.user ) {
      console.log('componentDidUpdate-IN',!this.state.fetching, this.props.user)
      this.setState({fetching: true})
      this.props.updateStocks(this.props.user);
    }
  }

  onDeleteClick(stockID, user) {
    this.props.deleteStock(stockID, this.props.user)
  }

  render() {
    const authenticated = this.props.user && this.props.user.providerData
    let result = ''
    if (authenticated) {
      result =
        <div>
          <Stock stocks={this.props.stocks} user={this.props.user} deleteStock={this.onDeleteClick} />
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
  return bindActionCreators({selectStock, updateStocks, deleteStock}, dispatch);
}

export default connect(mapStateToProps, mapDiscpatchToProps)(Stocks);
