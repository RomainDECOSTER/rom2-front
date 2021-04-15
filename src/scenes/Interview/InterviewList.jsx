import { CircularProgress, Grid, IconButton, Paper } from '@material-ui/core';
import { AddCircle, CheckBox, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { InterviewActioner } from 'services/interview';
import { lacleStore } from 'store';

function InterviewTable({ interviewed_id, type, interviewFound, intlData }) {
  const [data] = useState(useMemo(() => interviewFound, [interviewFound]));
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.interview.list;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.campaign,
        accessor: 'campaign',
      },
      {
        Header: columnTitles.created_at,
        accessor: 'created_at',
        Cell: ({ value }) => <div>{moment(value).format('DD-MM-YYYY')}</div>,
      },
      {
        Header: columnTitles.updated_at,
        accessor: 'updated_at',
        Cell: ({ value }) => <div>{moment(value).format('DD-MM-YYYY')}</div>,
      },
      {
        Header: columnTitles.interviewed_classmate_id,
        accessor: 'interviewed_classmate_id',
      },
      {
        Header: columnTitles.school_subject,
        accessor: 'school_subject',
      },
      {
        Header: columnTitles.stop_date,
        accessor: 'stop_date',
        Cell: ({ value }) => <div>{moment(value).format('DD-MM-YYYY')}</div>,
      },
      {
        Header: columnTitles.volunteer_stop,
        accessor: 'volunteer_stop',
        Cell: ({ value }) => <div>{value ? <CheckBox color="primary" /> : null} </div>,
      },
      {
        Header: columnTitles.student_stop,
        accessor: 'student_stop',
        Cell: ({ value }) => <div>{value ? <CheckBox color="primary" /> : null} </div>,
      },
      {
        Header: columnTitles.details,
        accessor: 'details',
      },
      {
        Header: commonDefaultTitles.actions,
        accessor: '_id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <IconButton size="small" component={Link} to={paths.front.interview.edit.replace(':id', value)}>
            <Edit />
          </IconButton>
        ),
      },
    ],
    [columnTitles.campaign, columnTitles.interviewed_id, commonDefaultTitles.actions],
  );

  const actions = [
    {
      render: () => (
        <IconButton
          size="small"
          onClick={() =>
            history.push(paths.front.interview.create.replace(':it', interviewed_id).replace(':type', type))
          }
        >
          <AddCircle color="primary" />
        </IconButton>
      ),
      isFreeAction: true,
    },
  ];

  return (
    <EnhancedTable
      title={intl.title.replace(':id', interviewed_id)}
      columns={columns}
      data={data}
      actions={actions}
      skipPageReset={skipPageReset}
    />
  );
}

function InterviewListComponent({ interviewed_id, type, campaign, ...props }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const reduxState = lacleStore.getState();
  const id_campaign = reduxState.Campaign.current_campaign;
  useEffect(() => {
    if (loading) {
      InterviewActioner.getInterviewedList(interviewed_id, id_campaign).then(docs => {
        console.log(docs);
        setInterviews(docs);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading]);

  return (
    <Paper>
      {loading ? (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className="height-circular">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <InterviewTable
          interviewed_id={interviewed_id}
          type={type}
          interviewFound={interviews}
          intlData={props.intl}
          reload={() => setLoading(true)}
        />
      )}
    </Paper>
  );
}

const InterviewList = injectIntl(InterviewListComponent);

export { InterviewList };
