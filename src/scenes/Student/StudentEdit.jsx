import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { StudentForm } from 'scenes';
import { StudentActioner } from 'services/student';

function StudentEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.studentEdit;

  function editForm(values) {
    return <StudentForm values={values} reload={() => reload({})} mode={'edit'} />;
  }

  function loadInfos() {
    return StudentActioner.get(id)
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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.title}</h2>
      <Loader render={renderEditForm} />
    </Box>
  );
}

const StudentEdit = injectIntl(StudentEditComponent);

export { StudentEdit };
