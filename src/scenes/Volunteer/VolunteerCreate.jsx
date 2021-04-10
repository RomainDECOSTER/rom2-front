import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { StudentUtils } from 'services/student';
import { VolunteerForm } from './VolunteerForm';

function VolunteerCreateComponent({ intl }) {
  function createForm(templates) {
    return <VolunteerForm templates={templates} mode={'create'} />;
  }

  function renderCreateForm(render) {
    StudentUtils.getStudentTemplates().then(templates => {
      render(createForm(templates));
    });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.messages.scenes.volunteer.create.title}</h2>
      <Loader render={renderCreateForm} />
    </Box>
  );
}

const VolunteerCreate = injectIntl(VolunteerCreateComponent);

export { VolunteerCreate };
