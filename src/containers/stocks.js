import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

class stocks extends Component {


  constructor(props) {
    super(props);

    this.renderStocks = this.renderStocks.bind(this);
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

  renderStocks() {
    return this.props.stocks.map(stock => {
      return (
        <li key={stock.id} className="list-group-item">
          {stock.id}
        </li>
      )
    });

  }
}

stocks.propTypes = {};
stocks.defaultProps = {};

function mapStateToProps(state) {
  return {
    stocks: state.stocks
  }
}

export default connect(mapStateToProps,null)(stocks);
