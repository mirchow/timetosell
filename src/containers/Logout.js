import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class Logout extends Component {

  componentWillMount() {
    this.setState(this.state.auth = null)
  }

  render() {
    return (
      <div></div>
    );
  }
}

Logout.propTypes = {};
Logout.defaultProps = {};

function mapStateToProps(state) {
  return {
    stocks: state.stocks.stocks,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Logout);
