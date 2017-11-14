import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { withRouter } from 'react-router-dom'

class Logout extends Component {
  componentDidMount() {
    this.props.logout(this.props.user)
    this.props.history.push('/')
  }

  render() {
    return <div />
  }
}

Logout.propTypes = {}
Logout.defaultProps = {}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default withRouter(connect(mapStateToProps, { logout })(Logout))
