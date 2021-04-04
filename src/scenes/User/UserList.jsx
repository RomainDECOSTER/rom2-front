import { CircularProgress, Grid, IconButton, Paper } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { UserActioner } from 'services/user';

function UserTable({ userFound, intlData }) {
  const [data] = useState(useMemo(() => userFound, [userFound]));
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.user.list;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.firstname,
        accessor: 'firstname',
      },
      {
        Header: columnTitles.lastname,
        accessor: 'lastname',
      },
      {
        Header: columnTitles.email,
        accessor: 'email',
      },
      {
        Header: columnTitles.roles,
        accessor: 'roles',
      },
      {
        Header: commonDefaultTitles.actions,
        accessor: '_id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <IconButton size="small" component={Link} to={paths.front.user.edit.replace(':id', value)}>
            <Edit />
          </IconButton>
        ),
      },
    ],
    [
      columnTitles.firstname,
      columnTitles.lastname,
      columnTitles.email,
      columnTitles.roles,
      commonDefaultTitles.actions,
    ],
  );

  const actions = [
    {
      render: () => (
        <IconButton size="small" onClick={() => history.push(paths.front.user.create)}>
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

function UserListComponent(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      UserActioner.getUserList().then(docs => {
        setUsers(docs);
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
        <UserTable userFound={users} intlData={props.intl} reload={() => setLoading(true)} />
      )}
    </Paper>
  );
}

const UserList = injectIntl(UserListComponent);

export { UserList };
