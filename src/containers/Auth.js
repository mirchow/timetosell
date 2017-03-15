import React, { Component, PropTypes } from "react";
import { firebaseRef } from "../firebase";
import { checkUserAuth, saveUser } from "../reducers/authReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from 'react-router-redux'
import { Link } from 'react-router'

class Auth extends Component {

  constructor(props) {
    super(props)

    // this.registerUser = this.registerUser.bind(this)
  }



  componentDidUpdate() {
    this.props.saveUser(this.props.user)
    console.log('auth push')
    this.props.push('/')
  }


  render() {
    if (!this.props.user) {
      return <div>loading</div>
    }
    return (
      <div>
        <Link to="/">Stocks</Link>
      </div>
    );
  }
}

Auth.propTypes = {};
Auth.defaultProps = {};

const mapStateToProps = store => {
  return {
    user: store.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkUserAuth,
    saveUser,
    push
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)