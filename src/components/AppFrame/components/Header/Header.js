import React, { useState } from 'react';
import { Menu as MenuIcon, ArrowBack, PowerSettingsNew, AccountCircle } from '@material-ui/icons';
import { AppBar, Toolbar, Divider, Typography, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { AuthenticationActioner } from 'services';
import { HeaderIconButton } from '../';
import { UserUtils } from 'services';
// import logo from './parkki-logo.png';
import './Header.scss';

import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

function HeaderComponent(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { navbarOpen, handleDrawerOpen, handleDrawerClose, userFullName } = props;
  const intl = props.intl.messages.components.appframe.header;
  // const displayLogo = useMediaQuery(`(min-width:${minHeaderWidth}px)`);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className="header-appbar">
      <Toolbar className="header-toolbar">
        <HeaderIconButton
          aria-label="open drawer"
          onClick={navbarOpen ? handleDrawerClose : handleDrawerOpen}
          icon={navbarOpen ? ArrowBack : MenuIcon}
        />
        <Divider orientation="vertical" flexItem className="header-divider" />
        {/* {displayLogo && <img className="header-logo" src={logo} alt="Parkki" />} */}
        <div className="header-grow" />
        <AccountCircle className="header-icon header-account-icon" />
        <Typography variant="body2" noWrap>
          {userFullName}
        </Typography>
        <Divider orientation="vertical" flexItem className="header-divider" />
        <HeaderIconButton aria-label="log out" icon={PowerSettingsNew} onClick={handleMenuOpen} />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={props.logOut}>
            <ListItemIcon className="log-out-icon">
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={intl.logout} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  userFullName: UserUtils.getFullName(state.User),
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AuthenticationActioner.logout()),
});

const Header = connect(mapStateToProps, mapDispatchToProps)(injectIntl(HeaderComponent));

export { Header };
