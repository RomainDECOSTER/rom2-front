import React, { useState } from 'react';
import clsx from 'clsx';
import { ExpandLess, ExpandMore, AddBox } from '@material-ui/icons';
import { Divider, Collapse, List, ListItemIcon, ListItemText } from '@material-ui/core';

import { NavItemComponent } from '../';
import './NavItem.scss';

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const { label, link, Icon, items = [], navbarOpen, openNavbar, first } = props;
  const hasItems = items && items.length > 0;
  const isExpandable = navbarOpen && hasItems;

  function handleClick() {
    if (navbarOpen) setOpen(!open);
    else if (!navbarOpen) {
      openNavbar();
      setOpen(true);
    }
  }

  let iconToDisplay;
  if (!first) {
    if (Icon) {
      iconToDisplay = <Icon className="navbar-item-add-icon" />;
    } else if (isExpandable) {
      iconToDisplay = <AddBox className="navbar-item-add-icon" />;
    }
  } else if (Icon) {
    iconToDisplay = (
      <ListItemIcon className="nav-item-icon">
        <Icon />
      </ListItemIcon>
    );
  }

  return (
    <>
      <NavItemComponent
        link={link}
        onClick={handleClick}
        className={clsx('navbar-item', !link && !hasItems && 'navbar-item-disabled')}
      >
        {iconToDisplay}
        <ListItemText
          inset={first && !Icon}
          primary={label}
          className={clsx(
            'nav-item-text',
            first && 'nav-item-module',
            !first && !isExpandable && !Icon && 'navbar-item-text-left-offset',
          )}
          disableTypography
        />
        {isExpandable && (open ? <ExpandLess /> : <ExpandMore />)}
      </NavItemComponent>
      {isExpandable && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            {items.map((item, index) => (
              <NavItem {...item} key={index} navbarOpen={navbarOpen} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export { NavItem };
