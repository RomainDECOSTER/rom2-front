import { CircularProgress, Grid, IconButton, Paper } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { WorkshopActioner } from 'services/workshop';

function WorkshopTable({ workshopFound, intlData }) {
  const [data] = useState(useMemo(() => workshopFound, [workshopFound]));
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.workshopList;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.name,
        accessor: 'name',
      },
      {
        Header: commonDefaultTitles.actions,
        accessor: '_id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <IconButton size="small" component={Link} to={paths.front.workshop.edit.replace(':id', value)}>
            <Edit />
          </IconButton>
        ),
      },
    ],
    [columnTitles.name, commonDefaultTitles.actions],
  );

  const actions = [
    {
      render: () => (
        <IconButton size="small" onClick={() => history.push(paths.front.workshop.create)}>
          <AddCircle color="primary" />
        </IconButton>
      ),
      isFreeAction: true,
    },
  ];

  return (
    <EnhancedTable title={intl.title} columns={columns} data={data} actions={actions} skipPageReset={skipPageReset} />
  );
}

function WorkshopListComponent(props) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      WorkshopActioner.list().then(docs => {
        setWorkshops(docs);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading]);

  return (
    <Paper>
      {loading ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '40vh' }}
        >
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <WorkshopTable workshopFound={workshops} intlData={props.intl} reload={() => setLoading(true)} />
      )}
    </Paper>
  );
}

const WorkshopList = injectIntl(WorkshopListComponent);

export { WorkshopList };
