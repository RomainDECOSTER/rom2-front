import { CircularProgress, Grid, IconButton, Paper } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { PositionedWorkshopApi, PositionedWorkshopUtils } from 'services/positionedWorkshop';

function PositionedWorkshopTable({ positionedWorkshopFound, intlData, templates }) {
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.positionedWorkshop.list;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.workshopName,
        accessor: 'workshop',
        Cell: ({ value }) => templates.workshops.find(w => w._id === value)?.name,
      },
      {
        Header: columnTitles.date,
        accessor: 'positioned_date',
        Cell: ({ value }) => moment(value).format('DD/MM/YYYY HH:mm'),
      },
      {
        Header: columnTitles.animator,
        accessor: 'animator',
        Cell: ({ value }) => templates.animators.find(w => w._id === value)?.firstname,
      },
      {
        Header: commonDefaultTitles.actions,
        accessor: '_id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <IconButton
            size="small"
            component={Link}
            to={paths.front.workshop.positionedWorkshop.edit.replace(':id', value)}
          >
            <Edit />
          </IconButton>
        ),
      },
    ],
    [
      columnTitles.animator,
      columnTitles.date,
      columnTitles.workshopName,
      commonDefaultTitles.actions,
      templates.animators,
      templates.workshops,
    ],
  );

  const actions = [
    {
      render: () => (
        <IconButton size="small" onClick={() => history.push(paths.front.workshop.positionedWorkshop.create)}>
          <AddCircle color="primary" />
        </IconButton>
      ),
      isFreeAction: true,
    },
  ];
  return (
    <EnhancedTable
      title={intl.title}
      columns={columns}
      data={positionedWorkshopFound}
      actions={actions}
      skipPageReset={skipPageReset}
    />
  );
}

function PositionedWorkshopComponent(props) {
  const [positionedWorkshops, setPositionedWorkshops] = useState([]);
  const [templates, setTemplates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [props.current_campaign]);

  useEffect(() => {
    if (loading) {
      Promise.all([
        PositionedWorkshopApi.getList(props.current_campaign),
        PositionedWorkshopUtils.getPositionedWorkshopTemplates(),
      ]).then(([positionedWorkshopsFound, templatesFound]) => {
        setPositionedWorkshops(positionedWorkshopsFound);
        setTemplates(templatesFound);
        setLoading(false);
      });
    }
    return () => {};
  }, [props.current_campaign, loading]);

  return (
    <Paper>
      {loading ? (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className="height-circular">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <PositionedWorkshopTable
          positionedWorkshopFound={positionedWorkshops}
          templates={templates}
          intlData={props.intl}
          reload={() => setLoading(true)}
        />
      )}
    </Paper>
  );
}

const mapStateToProps = state => ({
  current_campaign: state.Campaign.current_campaign,
});

const PositionedWorkshopList = connect(mapStateToProps)(injectIntl(PositionedWorkshopComponent));

export { PositionedWorkshopList };
