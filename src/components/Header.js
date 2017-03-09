import React from 'react'
import { AppBar, Avatar, IconButton } from 'material-ui'
// import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import { Link } from 'react-router'

const titleString = 'Time To Sell'
const avatar_icon_size = 32
const custom_padding = {
  padding: 8
}

const Header = ({ router, user }) => {
  console.log('router', router)
  return (
    <AppBar
      title={titleString}
      iconElementRight={
        <IconButton
          style={custom_padding}
          >
          <Avatar
            size={avatar_icon_size}
          />
        </IconButton>
      }
      iconElementLeft={
        <Link to="/login">Login</Link>
      }
    />
  )
}

export default Header
