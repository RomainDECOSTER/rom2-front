import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { ComonUtils } from 'services/comon';
import { lacleStore } from 'store';
import { InterviewForm } from './InterviewForm';

function InterviewCreateComponent({ intl, ...props }) {
  const interviewed_id = props.match.params.it;
  const type = props.match.params.type;
  const reduxState = lacleStore.getState();
  const id_campaign = reduxState.Campaign.current_campaign;

  function createForm(templates) {
    return <InterviewForm interviewed_id={interviewed_id} type={type} templates={templates} mode={'create'} />;
  }

  function renderCreateForm(render) {
    ComonUtils.getInterviewTemplates(id_campaign).then(templates => {
      render(createForm(templates));
    });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.messages.scenes.interview.create.title}</h2>
      <Loader render={renderCreateForm} />
    </Box>
  );
}

const InterviewCreate = injectIntl(InterviewCreateComponent);

export { InterviewCreate };
