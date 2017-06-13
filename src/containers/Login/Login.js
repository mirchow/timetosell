import React, { Component } from 'react'
import { firebaseUIConfig, firebaseAuthUI } from '../../firebase'

class Login extends Component {
/*
  handleSubmit = e => {
    console.log('handling submit', e);
  }

*/
  componentDidMount() {
    firebaseAuthUI.start("#firebaseui-auth-container", firebaseUIConfig)
  }

  render() {
    return <div id="firebaseui-auth-container"></div>
  }
}

export default Login