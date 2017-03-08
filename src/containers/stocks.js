import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, fetchStocks } from "./../reducers/stockReducer";
import { bindActionCreators } from "redux";

class Stocks extends Component {

  componentWillMount() {
    this.props.fetchStocks();
  }

  renderStocks() {
    const { stocks } = this.props.stocks;

    return stocks.map(stock => {
      return (
        <li
          onClick={() => this.props.selectStock(stock) }
          key={stock.id}
          className="list-group-item">
          {stock.id}
        </li>
      )
    });

  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderStocks()}
        </ul>

      </div>
    );
  }

}

Stocks.propTypes = {};
Stocks.defaultProps = {};

function mapStateToProps(state) {
  console.log(`mapStateToProps state: ${state.stocks}`);
  return {stocks: state.stocks}
}

function mapDiscpatchToProps(dispatch) {
  return bindActionCreators({selectStock, fetchStocks}, dispatch);
}

export default connect(mapStateToProps, mapDiscpatchToProps)(Stocks);
