import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React from 'react';
import { injectIntl } from 'react-intl';
import { PositionedWorkshopUtils } from 'services/positionedWorkshop';
import { PositionedWorkshopForm } from './PositionedWorkshopForm';

function PositionedWorkshopCreateComponent({ intl }) {
  function createForm(templates) {
    return <PositionedWorkshopForm templates={templates} mode="create" />;
  }

  function renderCreateForm(render) {
    PositionedWorkshopUtils.getPositionedWorkshopTemplates().then(templates => {
      render(createForm(templates));
    });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.messages.scenes.positionedWorkshop.create.title}</h2>
      <Loader render={renderCreateForm} />
    </Box>
  );
}

const PositionedWorkshopCreate = injectIntl(PositionedWorkshopCreateComponent);

export { PositionedWorkshopCreate };
