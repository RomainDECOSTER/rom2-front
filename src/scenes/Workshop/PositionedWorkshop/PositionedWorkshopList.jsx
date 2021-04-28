import { IconButton } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';

function PositionedWorkshopTable({ positionedWorkshopFound, intlData }) {
  const [data] = useMemo(() => positionedWorkshopFound, [positionedWorkshopFound]);

  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.positionedWorkshop.list;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(() => [
    {
      Header: columnTitles.workshopName,
      accessor: 'workshop.name',
    },
    {
      Header: columnTitles.date,
      accessor: 'positioned_date',
    },
    {
      Header: columnTitles.user,
      accessor: 'user.first_name',
    },
    {
      Header: commonDefaultTitles.actions,
      accessor: '_id',
      disableSortBy: true,
      Cell: ({ value }) => {
        <IconButton size="small" component={Link} to={paths.front.workshop.positionedWorkshop.edit(':id', value)}>
          <Edit />
        </IconButton>;
      },
    },
  ]);

  const actions = [
    {
      render: () => (
        <IconButton size="small" onClick={() => history.push(paths.front.workshop.positionedWorkshop.create)}>
          <AddCircle color="primary" />
        </IconButton>
      ),
    },
  ];
  return (
    <EnhancedTable title={intl.title} columns={columns} data={data} actions={actions} skipPageReset={skipPageReset} />
  );
}
