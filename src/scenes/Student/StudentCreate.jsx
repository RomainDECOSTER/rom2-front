import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { StudentUtils } from 'services/student';
import { StudentForm } from './StudentForm';

function StudentCreateComponent({ intl }) {
  function createForm(templates) {
    return <StudentForm templates={templates} mode={'create'} />;
  }

  function renderCreateForm(render) {
    StudentUtils.getStudentTemplates().then(templates => {
      render(createForm(templates));
    });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.messages.scenes.student.create.title}</h2>
      <Loader render={renderCreateForm} />
    </Box>
  );
}

const StudentCreate = injectIntl(StudentCreateComponent);

export { StudentCreate };
