import { CircularProgress, Grid, IconButton, Paper } from '@material-ui/core';
import { AccountBox, AddCircle, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { StudentActioner } from 'services/student';

function StudentTable({ studentFound, intlData }) {
  const [data] = useState(useMemo(() => studentFound, [studentFound]));
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.student.list;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.type,
        accessor: 'type',
      },
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
            <IconButton size="small" component={Link} to={paths.front.student.edit.replace(':id', value)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton size="small" component={Link} to={paths.front.student.profil.replace(':id', value)}>
              <AccountBox color="primary" />
            </IconButton>
          </div>
        ),
      },
    ],
    [
      columnTitles.type,
      columnTitles.mobile,
      columnTitles.last_name,
      columnTitles.first_name,
      columnTitles.email,
      commonDefaultTitles.actions,
    ],
  );

  const actions = [
    {
      render: () => (
        <IconButton size="small" onClick={() => history.push(paths.front.student.create)}>
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

function StudentListComponent(props) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [props.current_campaign]);

  useEffect(() => {
    if (loading) {
      StudentActioner.list(props.current_campaign).then(docs => {
        setStudents(docs);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading, props.current_campaign]);

  return (
    <Paper className="padding-small">
      {loading ? (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className="height-circular">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <StudentTable studentFound={students} intlData={props.intl} reload={() => setLoading(true)} />
      )}
    </Paper>
  );
}

const mapStateToProps = state => ({
  current_campaign: state.Campaign.current_campaign,
});

const StudentList = connect(mapStateToProps)(injectIntl(StudentListComponent));

export { StudentList };
