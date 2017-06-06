import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../reducers/authReducer";
import { push } from "react-router-redux";


class Logout extends Component {

  componentDidMount() {
    this.props.logout(this.props.user)
    this.props.push('/')
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
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout,
    push
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
