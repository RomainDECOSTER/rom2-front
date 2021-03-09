import { Paper } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import { CampaignEditForm } from '../CampaignEditForm/CampaignEditForm';

function CampaignCreateComponent({ intl }) {
  return (
    <Paper className="padding-small">
      <h2>{intl.messages.scenes.campaignCreate.title}</h2>
      <CampaignEditForm mode={'create'} />
    </Paper>
  );
}

const CampaignCreate = injectIntl(CampaignCreateComponent);

export { CampaignCreate };
