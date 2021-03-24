import { Paper } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { UserActioner } from 'services/user';
import { UserForm } from './UserForm';

function UserEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.userEdit;

  function editForm(values) {
    return <UserForm values={values} reload={() => reload({})} mode={'edit'} />;
  }

  function loadInfos() {
    return UserActioner.getSpecificUserInfos(id)
      .then(infos => {
        const values = { ...infos, id };
        return values;
      })
      .catch(err => {
        throw err;
      });
  }

  function renderEditForm(render) {
    loadInfos().then(values => {
      render(editForm(values));
    });
  }

  return (
    <Paper className="padding-small">
      <h2>{intl.title}</h2>
      <Loader render={renderEditForm} />
    </Paper>
  );
}

const UserEdit = injectIntl(UserEditComponent);

export { UserEdit };
