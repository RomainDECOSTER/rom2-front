import { Paper } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import { WorkshopForm } from './WorkshopForm';

function WorkshopCreateComponent({ intl }) {
  return (
    <Paper className="padding-small">
      <h2>{intl.messages.scenes.workshopCreate.title}</h2>
      <WorkshopForm mode={'create'} />
    </Paper>
  );
}

const WorkshopCreate = injectIntl(WorkshopCreateComponent);

export { WorkshopCreate };
