import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import { InterviewForm } from './InterviewForm';

function InterviewCreateComponent({ intl, ...props }) {
  const interviewed_id = props.location.state.interviewed_id;
  const type = props.location.state.type;
  const templates = props.location.state.templates;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className="full-width padding-small"
    >
      <Paper className="padding-small">
        <h2 className="text-centered">{intl.messages.scenes.interview.create.title}</h2>
        <InterviewForm interviewed_id={interviewed_id} type={type} templates={templates} mode={'create'} />
      </Paper>
    </Box>
  );
}

const InterviewCreate = injectIntl(InterviewCreateComponent);

export { InterviewCreate };
