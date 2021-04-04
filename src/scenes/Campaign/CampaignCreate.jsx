import { Paper } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import { CampaignForm } from './CampaignForm';

function CampaignCreateComponent({ intl }) {
  return (
    <Paper className="padding-small">
      <h2 className="text-centered">{intl.messages.scenes.campaign.create.title}</h2>
      <CampaignForm mode={'create'} />
    </Paper>
  );
}

const CampaignCreate = injectIntl(CampaignCreateComponent);

export { CampaignCreate };
