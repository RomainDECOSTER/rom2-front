import { Paper } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { CampaignActioner } from 'services/campaign';
import { CampaignEditForm } from '../CampaignEditForm/CampaignEditForm';

function CampaignEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.campaignEdit;

  function editForm(values) {
    return <CampaignEditForm values={values} reload={() => reload({})} mode={'edit'} />;
  }

  function loadInfos() {
    return CampaignActioner.get(id)
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
    <Paper className="padding-small">
      <h2>{intl.title}</h2>
      <Loader render={renderEditForm} />
    </Paper>
  );
}

const CampaignEdit = injectIntl(CampaignEditComponent);

export { CampaignEdit };
