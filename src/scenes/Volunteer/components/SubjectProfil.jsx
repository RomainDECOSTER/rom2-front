import { Paper, Typography } from '@material-ui/core';
import { Table } from 'components/Table';
import React from 'react';
import { injectIntl } from 'react-intl';

function SubjectsProfilComponent({ data, disabled, ...props }) {
  const intl = props.intl.messages.components.subjects;
  const labels = intl.labels;

  const columns = [
    {
      id: 'name',
      align: 'center',
      label: labels.name,
      render: (row, index) => <Typography key={index}>{row.name}</Typography>,
    },
    {
      id: 'type',
      align: 'center',
      label: labels.type,
      render: (row, index) => <Typography key={index}>{row.type}</Typography>,
    },
    {
      id: 'level',
      align: 'center',
      label: labels.level,
      render: (row, index) => <Typography key={index}>{row.level}</Typography>,
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

const SubjectsProfil = injectIntl(SubjectsProfilComponent);

export { SubjectsProfil };
