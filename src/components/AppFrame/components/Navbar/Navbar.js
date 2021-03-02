import React from 'react';
import clsx from 'clsx';
import { List, Drawer } from '@material-ui/core';

import { NavItem } from '../';
import './Navbar.scss';

function Navbar(props) {
  const { navbarOpen, navLinks, openNavbar } = props;

  return (
    <Drawer
      variant="permanent"
      className="navbar"
      classes={{
        paper: clsx(navbarOpen ? 'navbar-open' : 'navbar-close'),
      }}
    >
      <List component="nav" disablePadding className="nav-list">
        {navLinks.map((item, index) => (
          <NavItem {...item} first key={index} navbarOpen={navbarOpen} openNavbar={openNavbar} />
        ))}
      </List>
    </Drawer>
  );
}

export { Navbar };
