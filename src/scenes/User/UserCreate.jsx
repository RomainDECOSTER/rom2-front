import { Paper } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import { UserForm } from './UserForm';

function UserCreateComponent({ intl }) {
  return (
    <Paper className="padding-small">
      <h2 className="text-centered">{intl.messages.scenes.user.create.title}</h2>
      <UserForm mode={'create'} />
    </Paper>
  );
}

const UserCreate = injectIntl(UserCreateComponent);

export { UserCreate };
