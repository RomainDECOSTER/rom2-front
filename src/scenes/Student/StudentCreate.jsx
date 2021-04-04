import { Box } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import { StudentForm } from './StudentForm';

function StudentCreateComponent({ intl }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.messages.scenes.studentCreate.title}</h2>
      <StudentForm mode={'create'} />
    </Box>
  );
}

const StudentCreate = injectIntl(StudentCreateComponent);

export { StudentCreate };
