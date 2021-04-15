import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ComonUtils } from 'services/comon';
import { InterviewActioner } from 'services/interview';
import { lacleStore } from 'store';
import { InterviewForm } from './InterviewForm';

function InterviewEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.interview.edit;
  const reduxState = lacleStore.getState();
  const id_campaign = reduxState.Campaign.current_campaign;

  function editForm(values, templates) {
    return <InterviewForm values={values} templates={templates} reload={() => reload({})} mode={'edit'} />;
  }

  function loadInfos() {
    return InterviewActioner.get(id)
      .then(infos => {
        const values = { ...infos, id };
        return values;
      })
      .catch(err => {
        throw err;
      });
  }

  function renderEditForm(render) {
    Promise.all([loadInfos(), ComonUtils.getInterviewTemplates(id_campaign)]).then(([values, templates]) => {
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

const InterviewEdit = injectIntl(InterviewEditComponent);

export { InterviewEdit };
