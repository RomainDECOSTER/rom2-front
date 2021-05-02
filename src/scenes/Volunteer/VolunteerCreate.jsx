import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { ComonUtils } from 'services/comon';
import { VolunteerActioner } from 'services/volunteer';
import { VolunteerForm } from './VolunteerForm';

function VolunteerCreateComponent({ intl, ...props }) {
  function createForm(templates, values = {}) {
    return <VolunteerForm templates={templates} values={values} mode={'create'} />;
  }

  function renderCreateForm(render) {
    const promises = [ComonUtils.getComonTemplates()];
    if (props.location.state?.duplicate) {
      promises.push(VolunteerActioner.get(props.location.state.id));
    }
    Promise.all(promises).then(([templates, values]) => {
      if (values === undefined) {
        render(createForm(templates));
      } else {
        render(createForm(templates, values));
      }
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
