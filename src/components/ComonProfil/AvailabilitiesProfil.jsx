import { Paper, Typography } from '@material-ui/core';
import { Table } from 'components/Table';
import React from 'react';
import { injectIntl } from 'react-intl';

function AvailabilitiesProfilComponent({ data, disabled, ...props }) {
  const intl = props.intl.messages.components.availabilities;
  const labels = intl.labels;

  const columns = [
    {
      id: 'day',
      align: 'center',
      label: labels.day,
      render: (row, index) => <Typography key={`${index}-day`}>{row.day}</Typography>,
    },
    {
      id: 'start_hour',
      align: 'center',
      label: labels.startHour,
      render: (row, index) => <Typography key={`${index}-start`}>{row.start_hour}</Typography>,
    },
    {
      id: 'end_hour',
      align: 'center',
      label: labels.endHour,
      render: (row, index) => <Typography key={`${index}-end`}>{row.end_hour}</Typography>,
    },
  ];

  return (
    <Paper className="padding-small full-width marginB20 info">
      <Typography variant="h4" gutterBottom className="info-title">
        {intl.title}
      </Typography>
      <Table columns={columns} rows={data} />
    </Paper>
  );
}

const AvailabilitiesProfil = injectIntl(AvailabilitiesProfilComponent);

export { AvailabilitiesProfil };
