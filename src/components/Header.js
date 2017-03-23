import React, { Component } from 'react'
import { AppBar, Avatar, IconButton, IconMenu, MenuItem } from 'material-ui'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import { Link } from 'react-router'

/**
* material UI icons
* google material icons site - https://design.google.com/icons/
*
* To construct an icon, find it in the google site. Then transform the name.
* Eg: search for cloud, you will find "cloud download" in the "file" category ...
*
* so the React component class is: [File][CloudDownload]
* so the import is: material-ui/svg-icons/[file]/[cloud-download]
*/

const titleString = 'Time To Sell'
const avatar_icon_size = 32
const custom_padding = {
  padding: 8
}
// from https://github.com/r3bl-alliance/starterproject_todolist_react_firebase_ts_md/blob/master/src/client/ui/header.js

class Header extends Component {

  render() {
    const { user } = this.props
    const authenticated = user && user.providerData
    let appbar = ''
    if (authenticated) {
      appbar =
        <AppBar
          title={titleString}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton
                  style={custom_padding}
                >
                  <Avatar
                    size={avatar_icon_size}
                    src={authenticated ? user.providerData[0].photoURL : ''}
                  />
                </IconButton>
              }
            >
              <MenuItem >
                <Link to='/logout' >Logout</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/'>Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/addStock'>Add Stock</Link>
              </MenuItem>
            </IconMenu>
          }
        />
    } else {
      // not yet logged in
      appbar =
        <AppBar
          title={titleString}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton
                  style={custom_padding}
                >
                  <Avatar
                    size={avatar_icon_size}
                    onTouchTap={this.loginAction}
                    icon={<ActionAccountCircle />}
                  />
                </IconButton>
              }
            >
              <MenuItem>
                <Link to='/login'>Login</Link>
              </MenuItem>
            </IconMenu>
          }
        />
    }
    return appbar
  }
}

export default Header
