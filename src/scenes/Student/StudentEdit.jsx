import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { StudentForm } from 'scenes';
import { ComonUtils } from 'services/comon';
import { StudentActioner } from 'services/student';

function StudentEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.student.edit;

  function editForm(values, templates) {
    return <StudentForm values={values} templates={templates} reload={() => reload({})} mode={'edit'} />;
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

const StudentEdit = injectIntl(StudentEditComponent);

export { StudentEdit };
