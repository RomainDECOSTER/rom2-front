import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ComonUtils } from 'services/comon';
import { VolunteerActioner } from 'services/volunteer';
import { VolunteerForm } from './VolunteerForm';

function VolunteerEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.volunteer.edit;

  function editForm(values, templates) {
    return <VolunteerForm values={values} templates={templates} reload={() => reload({})} mode={'edit'} />;
  }

  function loadInfos() {
    return VolunteerActioner.get(id)
      .then(infos => {
        const values = { ...infos, id };
        return values;
      })
      .catch(err => {
        throw err;
      });
  }

  function renderEditForm(render) {
    Promise.all([loadInfos(), ComonUtils.getComonTemplates()]).then(([values, templates]) => {
      render(editForm(values, templates));
    });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.title}</h2>
      <Loader render={renderEditForm} />
    </Box>
  );
}

const VolunteerEdit = injectIntl(VolunteerEditComponent);

export { VolunteerEdit };
