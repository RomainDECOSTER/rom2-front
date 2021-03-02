import React from 'react';
import { IconButton } from '@material-ui/core';

import './HeaderIconButton.scss';

function HeaderIconButton(props) {
  const { icon: Icon } = props;

  return (
    <IconButton {...props} color="inherit" className="header-icon-button">
      <Icon className="header-icon" />
    </IconButton>
  );
}

export { HeaderIconButton };
