import { Box, IconButton, Paper } from '@material-ui/core';
import { AddCircle, CheckBox, Edit } from '@material-ui/icons';
import { EnhancedTable, Loader } from 'components';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { CampaignUtils } from 'services/campaign';
import { ComonUtils } from 'services/comon';
import { InterviewActioner } from 'services/interview';
import { lacleStore } from 'store';
import './Interview.scss';

function InterviewTable({ interviewedId, type, templates, interviewFound, intlData }) {
  const [data] = useState(useMemo(() => interviewFound, [interviewFound]));
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.interview.list;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;
  const classMate_type = type === 'student' ? 'volunteer' : 'student';

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.campaign,
        accessor: 'campaign',
        Cell: ({ value }) => <div>{CampaignUtils.getCampaignName(value, templates)}</div>,
      },
      {
        Header: columnTitles.created_at,
        accessor: 'created_at',
        Cell: ({ value }) => <div>{moment(value).format('DD-MM-YYYY')}</div>,
      },
      {
        Header: columnTitles.interviewed_classmate_id,
        accessor: 'interviewed_classmate_id',
        Cell: ({ value }) => <div>{ComonUtils.getPorfilNames(value, classMate_type, templates)}</div>,
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
        Cell: ({ value }) => <div className="margin-left">{value ? <CheckBox color="primary" /> : null} </div>,
      },
      {
        Header: columnTitles.student_stop,
        accessor: 'student_stop',
        Cell: ({ value }) => <div className="margin-left">{value ? <CheckBox color="primary" /> : null} </div>,
      },
      {
        Header: columnTitles.details,
        accessor: 'details',
        Cell: ({ value }) => <div>{value.length > 50 ? `${value.slice(0, 50)} ...` : value.slice(0, 50)}</div>,
      },
      {
        Header: commonDefaultTitles.actions,
        accessor: '_id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <IconButton
            size="small"
            component={Link}
            to={{ pathname: paths.front.interview.edit.replace(':id', value), state: { templates: templates } }}
          >
            <Edit />
          </IconButton>
        ),
      },
    ],
    [
      columnTitles.campaign,
      columnTitles.created_at,
      columnTitles.school_subject,
      columnTitles.stop_date,
      columnTitles.volunteer_stop,
      columnTitles.student_stop,
      columnTitles.details,
      commonDefaultTitles.actions,
    ],
  );

  const actions = [
    {
      render: () => (
        <IconButton
          size="small"
          onClick={() =>
            history.push({
              pathname: paths.front.interview.create,
              state: {
                interviewedId: interviewedId,
                type: type,
                templates: templates,
              },
            })
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
      title={intl.title.replace(':id', ComonUtils.getPorfilNames(interviewedId, type, templates))}
      columns={columns}
      data={data}
      actions={actions}
      skipPageReset={skipPageReset}
    />
  );
}

function InterviewListComponent({ interviewedId, type, campaign, ...props }) {
  const reduxState = lacleStore.getState();
  const idCampaign = reduxState.Campaign.current_campaign;

  function loadList() {
    return InterviewActioner.list(interviewedId, idCampaign)
      .then(docs => {
        const values = [...docs];
        return values;
      })
      .catch(err => {
        throw err;
      });
  }

  function tableList(values = [], templates) {
    return (
      <InterviewTable
        interviewedId={interviewedId}
        type={type}
        interviewFound={values}
        templates={templates}
        intlData={props.intl}
      />
    );
  }

  function renderCreateForm(render) {
    Promise.all([loadList(), ComonUtils.getInterviewTemplates(idCampaign)]).then(([values, templates]) => {
      render(tableList(values, templates));
    });
  }

  return (
    <Paper>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
        <Loader render={renderCreateForm} />
      </Box>
    </Paper>
  );
}

const InterviewList = injectIntl(InterviewListComponent);

export { InterviewList };
