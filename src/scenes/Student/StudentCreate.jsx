import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { ComonUtils } from 'services/comon';
import { StudentActioner } from 'services/student';
import { StudentForm } from './StudentForm';

function StudentCreateComponent({ intl, ...props }) {
  function createForm(templates, values = {}) {
    return <StudentForm templates={templates} values={values} mode={'create'} />;
  }

  function renderCreateForm(render) {
    const promises = [ComonUtils.getComonTemplates()];
    if (props.location.state?.duplicate) {
      promises.push(StudentActioner.get(props.location.state.id));
    }
    Promise.all(promises).then(([templates, values]) => {
      if (values === undefined) {
        render(createForm(templates));
      } else {
        delete values._id;
        render(createForm(templates, values));
      }
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
