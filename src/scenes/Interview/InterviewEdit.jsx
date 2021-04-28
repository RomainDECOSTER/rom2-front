import { Box, Paper } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { ComonUtils } from 'services/comon';
import { InterviewActioner } from 'services/interview';
import { InterviewForm } from './InterviewForm';

function InterviewEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const templates = props.location.state.templates;
  const intl = props.intl.messages.scenes.interview.edit;
  const idCampaign = props.current_campaign;

  function editForm(values) {
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
    Promise.all([loadInfos(), ComonUtils.getInterviewTemplates(idCampaign)]).then(([values, templates]) => {
      render(editForm(values));
    });
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className="full-width padding-small"
    >
      <Paper className="padding-small">
        <h2 className="text-centered">{intl.title}</h2>
        <Loader render={renderEditForm} />
      </Paper>
    </Box>
  );
}

const mapStateToProps = state => ({
  current_campaign: state.Campaign.current_campaign,
});

const InterviewEdit = connect(mapStateToProps)(injectIntl(InterviewEditComponent));

export { InterviewEdit };
