import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, fetchStocks, updateStocks } from "./../reducers/stockReducer";
import { bindActionCreators } from "redux";
import Stock from "./../components/Stock";



class Stocks extends Component {

  componentWillMount() {
    this.props.updateStocks();
  }



  render() {
    return (
      <Stock stocks={this.props.stocks}/>
    );
  }

}

Stocks.propTypes = {};
Stocks.defaultProps = {};

function mapStateToProps(state) {
  console.log('mapStateToProps state', state.stocks);
  return {
    stocks: state.stocks.stocks
  }

}

function mapDiscpatchToProps(dispatch) {
  return bindActionCreators({selectStock, fetchStocks, updateStocks}, dispatch);
}

export default connect(mapStateToProps, mapDiscpatchToProps)(Stocks);
