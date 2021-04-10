import { CircularProgress, Grid, IconButton, Paper } from '@material-ui/core';
import { AccountBox, AddCircle, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { VolunteerActioner } from 'services/volunteer';
import { lacleStore } from 'store';

function VolunteerTable({ volunteerFound, intlData }) {
  const [data] = useState(useMemo(() => volunteerFound, [volunteerFound]));
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.volunteer.list;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.mobile,
        accessor: 'general_information.mobile',
      },
      {
        Header: columnTitles.last_name,
        accessor: 'general_information.last_name',
      },
      {
        Header: columnTitles.first_name,
        accessor: 'general_information.first_name',
      },
      {
        Header: columnTitles.email,
        accessor: 'general_information.email',
      },
      {
        Header: commonDefaultTitles.actions,
        accessor: '_id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <div>
            <IconButton size="small" component={Link} to={paths.front.volunteer.edit.replace(':id', value)}>
              <Edit />
            </IconButton>
            <IconButton size="small" component={Link} to={paths.front.volunteer.profil.replace(':id', value)}>
              <AccountBox />
            </IconButton>
          </div>
        ),
      },
    ],
    [
      columnTitles.phone,
      columnTitles.first_name,
      columnTitles.last_name,
      columnTitles.email,
      commonDefaultTitles.actions,
    ],
  );

  const actions = [
    {
      render: () => (
        <IconButton size="small" onClick={() => history.push(paths.front.volunteer.create)}>
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

function VolunteerListComponent(props) {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const reduxState = lacleStore.getState();
  const id_campaign = reduxState.Campaign.current_campaign;

  useEffect(() => {
    if (loading) {
      VolunteerActioner.list(id_campaign).then(docs => {
        setVolunteers(docs);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading]);

  return (
    <Paper className="padding-small">
      {loading ? (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className="height-circular">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <VolunteerTable volunteerFound={volunteers} intlData={props.intl} reload={() => setLoading(true)} />
      )}
    </Paper>
  );
}

const VolunteerList = injectIntl(VolunteerListComponent);

export { VolunteerList };
