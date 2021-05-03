import { CircularProgress, Grid, Paper } from '@material-ui/core';
import { EnhancedTable } from 'components/EnhancedTable';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { UserActioner } from 'services';
import { PositionedWorkshopActioner } from 'services/positionedWorkshop';
import { WorkshopActioner } from 'services/workshop';

function WorkshopManagementComponent({ entityId, getActioner, current_campaign, ...props }) {
  const [entity, setEntity] = useState({});
  const [workshops, setWorkshops] = useState([]);
  const [positionedWorkshop, setPositionedWorkshop] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      Promise.all([
        getActioner(entityId),
        WorkshopActioner.list(),
        PositionedWorkshopActioner.list(current_campaign),
        UserActioner.getUserList(),
      ]).then(([e, w, p, u]) => {
        setEntity(e);
        setWorkshops(w);
        setPositionedWorkshop(p);
        setUsers(u);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading, entityId, getActioner, current_campaign]);

  const columns = useMemo(
    () => [
      {
        Header: 'Atelier',
        accessor: 'positioned_workshop',
        Cell: ({ value }) =>
          positionedWorkshop.length > 0
            ? workshops.find(w => positionedWorkshop.find(p => p._id === value).workshop === w._id).name
            : '',
      },
      {
        Header: 'Date',
        accessor: 'positioned_date',
        Cell: ({ cell }) =>
          positionedWorkshop.length > 0
            ? moment(
                positionedWorkshop.find(p => p._id === cell.row.original.positioned_workshop).positioned_date,
              ).format('DD/MM/YYYY HH:mm')
            : '',
      },
      {
        Header: 'Animateur',
        accessor: 'animator',
        Cell: ({ cell }) =>
          positionedWorkshop.length > 0 && users.length > 0
            ? users.find(
                u => positionedWorkshop.find(p => p._id === cell.row.original.positioned_workshop).animator === u._id,
              ).firstname
            : '',
      },
    ],
    [positionedWorkshop, workshops, users],
  );

  return (
    <>
      {loading ? (
        <Grid container item spacing={0} direction="column" alignItems="center" justify="center" minHeight="200vh">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <Paper>
          <EnhancedTable title={'Atelier positionnés'} columns={columns} data={entity.workshop.workshop_managments} />
        </Paper>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  current_campaign: state.Campaign.current_campaign,
});

const WorkshopManagement = connect(mapStateToProps)(injectIntl(WorkshopManagementComponent));

export { WorkshopManagement };
