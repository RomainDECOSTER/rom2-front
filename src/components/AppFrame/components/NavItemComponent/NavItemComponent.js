import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem } from '@material-ui/core';

function NavItemComponent(props) {
  const { onClick, className, link, children } = props;

  if (typeof link !== 'string') {
    return <ListItem button className={className} children={children} onClick={onClick} />;
  }

  return (
    <ListItem
      button
      className={className}
      children={children}
      component={forwardRef((props, ref) => (
        <NavLink exact {...props} innerRef={ref} />
      ))}
      to={link}
    />
  );
}

export { NavItemComponent };
