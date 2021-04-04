import { Paper } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { WorkshopForm } from 'scenes';
import { WorkshopActioner } from 'services/workshop';

function WorkshopEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.workshop.edit;

  function editForm(values) {
    return <WorkshopForm values={values} reload={() => reload({})} mode={'edit'} />;
  }

  function loadInfos() {
    return WorkshopActioner.get(id)
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
      <h2 className="text-centered">{intl.title}</h2>
      <Loader render={renderEditForm} />
    </Paper>
  );
}

const WorkshopEdit = injectIntl(WorkshopEditComponent);

export { WorkshopEdit };
