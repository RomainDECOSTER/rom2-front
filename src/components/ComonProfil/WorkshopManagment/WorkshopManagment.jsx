import { CircularProgress, Dialog, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { AddCircle, Edit, EventAvailable, EventBusy } from '@material-ui/icons';
import { EnhancedTable } from 'components/EnhancedTable';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { UserActioner } from 'services';
import { PositionedWorkshopActioner } from 'services/positionedWorkshop';
import { WorkshopActioner } from 'services/workshop';
import './WorkshopManagment.scss';
import { WorkshopManagmentForm } from './WorkshopManagmentForm';

function WorkshopManagmentComponent({ entityId, getActioner, currentCampaign, updateActioner, ...props }) {
  const [entity, setEntity] = useState({});
  const [workshops, setWorkshops] = useState([]);
  const [positionedWorkshop, setPositionedWorkshop] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();

  useEffect(() => {
    if (loading) {
      Promise.all([
        getActioner(entityId),
        WorkshopActioner.list(),
        PositionedWorkshopActioner.list(currentCampaign),
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
  }, [loading, entityId, getActioner, currentCampaign]);

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
      {
        Header: 'Accepté',
        accessor: 'accepted',
        Cell: ({ cell, value }) => (value ? <EventAvailable /> : cell.row.original.rejected ? <EventBusy /> : ''),
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => (value !== undefined || value !== '' ? moment(value).format('DD/MM/YYYY') : ''),
      },
      {
        Header: 'Présent',
        accessor: 'present',
        Cell: ({ cell, value }) => (value ? <EventAvailable /> : <EventBusy />),
      },
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ cell }) => {
          return (
            <>
              <IconButton
                onClick={() => {
                  setOpenEdit(true);
                  setIndexToEdit(cell.row.id);
                }}
              >
                <Edit size="small" />
              </IconButton>
              <Dialog open={cell.row.id === indexToEdit && openEdit} onClose={() => setOpenEdit(false)} fullWidth>
                <WorkshopManagmentForm
                  entity={entity}
                  workshops={workshops}
                  positionedWorkshops={positionedWorkshop}
                  updateActioner={updateActioner}
                  indexToEdit={parseInt(indexToEdit, 10)}
                  onClose={() => {
                    setOpenEdit(false);
                    setLoading(true);
                  }}
                />
              </Dialog>
            </>
          );
        },
      },
    ],
    [positionedWorkshop, workshops, users, indexToEdit, openEdit, entity, updateActioner],
  );

  const actions = [
    {
      render: () => {
        return (
          <>
            <IconButton onClick={() => setOpenCreate(true)}>
              <AddCircle size="small" />
            </IconButton>
            <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth>
              <WorkshopManagmentForm
                entity={entity}
                workshops={workshops}
                positionedWorkshops={positionedWorkshop}
                updateActioner={updateActioner}
                onClose={() => {
                  setOpenCreate(false);
                  setLoading(true);
                }}
              />
            </Dialog>
          </>
        );
      },
      isFreeAction: true,
    },
  ];

  return (
    <>
      {loading ? (
        <Grid container item spacing={0} direction="column" alignItems="center" justify="center">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <>
          <Paper className="workshop-available">
            <div className="workshop-available-content">
              <Typography variant="h6">Ateliers Disponibles</Typography>
              {entity.workshop.workshops.map(w => workshops.find(wf => wf._id === w).name).join(' / ')}
            </div>
          </Paper>
          <Paper>
            <EnhancedTable
              title={'Atelier positionnés'}
              columns={columns}
              data={entity.workshop.workshop_managments}
              actions={actions}
              useMultipleSelect={false}
            />
          </Paper>
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  currentCampaign: state.Campaign.current_campaign,
});

const WorkshopManagment = connect(mapStateToProps)(injectIntl(WorkshopManagmentComponent));

export { WorkshopManagment };
