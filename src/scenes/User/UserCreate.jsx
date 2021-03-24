import { Paper } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import { UserForm } from './UserForm';

function UserCreateComponent({ intl }) {
  return (
    <Paper className="padding-small">
      <h2>{intl.messages.scenes.userCreate.title}</h2>
      <UserForm mode={'create'} />
    </Paper>
  );
}

const UserCreate = injectIntl(UserCreateComponent);

export { UserCreate };
