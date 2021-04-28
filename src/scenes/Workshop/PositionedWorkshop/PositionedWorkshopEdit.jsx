import { Box } from '@material-ui/core';
import { Loader } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { PositionedWorkshopActioner, PositionedWorkshopUtils } from 'services/positionedWorkshop';
import { PositionedWorkshopForm } from './PositionedWorkshopForm';

function PositionedWorkshopEditComponent(props) {
  const [, reload] = useState();
  const id = props.match.params.id;
  const intl = props.intl.messages.scenes.positionedWorkshop.edit;
  function editForm(values, templates) {
    return (
      <PositionedWorkshopForm values={{ ...values, id }} templates={templates} reload={() => reload({})} mode="edit" />
    );
  }

  function renderEditForm(render) {
    Promise.all([PositionedWorkshopActioner.get(id), PositionedWorkshopUtils.getPositionedWorkshopTemplates()]).then(
      ([values, templates]) => {
        render(editForm(values, templates));
      },
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <h2>{intl.title}</h2>
      <Loader render={renderEditForm} />
    </Box>
  );
}

const PositionedWorkshopEdit = injectIntl(PositionedWorkshopEditComponent);

export { PositionedWorkshopEdit };
