import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Grid } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { Selector } from 'components/Selector';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    positioned_workshop: vod(values.positioned_workshop, ''),
    accepted: vod(values.accepted, ''),
    rejected: vod(values.rejected, ''),
    date: vod(values.date, ''),
    present: vod(values.present, ''),
  };
}

function WorkshopManagmentFormComponent({
  entity,
  indexToEdit,
  positionedWorkshops,
  workshops,
  updateActioner,
  onClose,
  ...props
}) {
  const [entityFields] = useState({ ...entity });
  const initialValues = getInitialValues(entityFields?.workshop?.workshop_managments[indexToEdit] || {});
  const [fields, setFields] = useState({
    ...initialValues,
    errors: {
      positioned_workshop: false,
    },
  });

  function setFieldFunction(name) {
    return value => {
      setFields(f => ({ ...f, [name]: value, errors: { ...f.errors, [name]: false } }));
    };
  }

  function setError(name) {
    setFields(f => ({ ...f, errors: { ...f.errors, [name]: true } }));
  }

  function addNewPositionedWorkshop() {
    let newWorkshopManagments = [...entity.workshop.workshop_managments];
    if (newWorkshopManagments === undefined) {
      newWorkshopManagments = [];
    }
    if (fields.positioned_workshop === '') {
      setError('positioned_workshop');
      return;
    }
    newWorkshopManagments.push({ positioned_workshop: fields.positioned_workshop });
    const newEndtity = {
      ...entityFields,
      workshop: { ...entityFields.workshop, workshop_managments: [...newWorkshopManagments] },
    };
    updateActioner(newEndtity._id, newEndtity).then(() => onClose());
  }

  function editPositionedWorkshop() {
    let newWorkshopManagments = [...entity.workshop.workshop_managments];
    if (fields.accepted !== initialValues.accepted) {
      newWorkshopManagments[indexToEdit].accepted = fields.accepted;
    }
    if (fields.rejected !== initialValues.rejected) {
      newWorkshopManagments[indexToEdit].rejected = fields.rejected;
    }
    if (fields.date !== initialValues.date) {
      newWorkshopManagments[indexToEdit].date = fields.date;
    }
    if (fields.present !== initialValues.present) {
      newWorkshopManagments[indexToEdit].present = fields.present;
    }
    const newEndtity = {
      ...entityFields,
      workshop: { ...entityFields.workshop, workshop_managments: [...newWorkshopManagments] },
    };
    console.log(newWorkshopManagments);
    updateActioner(newEndtity._id, newEndtity).then(() => onClose());
  }

  const allowedPositionedWorkshops = useMemo(
    () =>
      positionedWorkshops.filter(
        p =>
          entityFields.workshop.workshops.includes(p.workshop) &&
          entityFields.workshop.workshop_managments.find(wm => wm.positioned_workshop === p._id) === undefined,
      ),
    [entityFields.workshop.workshop_managments, entityFields.workshop.workshops, positionedWorkshops],
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
      <Grid container className="padding-small">
        {indexToEdit === undefined && (
          <>
            <Grid item xs={12} sm={12}>
              <Selector
                labelId="positioned_workshops"
                label={'Sur quel atelier'}
                selected={fields.positioned_workshop}
                setSelected={setFieldFunction('positioned_workshop')}
                items={allowedPositionedWorkshops.map(p => ({
                  label: `${workshops.find(w => w._id === p.workshop).name} le ${moment(p.positioned_date).format(
                    'DD/MM/YYYY HH:mm',
                  )}`,
                  value: p._id,
                }))}
                error={fields.errors.positioned_workshop}
              />
            </Grid>
            <Grid container justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircle />}
                onClick={() => addNewPositionedWorkshop()}
              >
                Save
              </Button>
            </Grid>
          </>
        )}
        {indexToEdit !== undefined && (
          <>
            <Grid item xs={12} sm={6} md={6} container>
              <Grid item xs={12} sm={6} md={6} container>
                <CheckboxField label={'Accepté'} checked={fields.accepted} setField={setFieldFunction('accepted')} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} container>
                <CheckboxField label={'Réfusé'} checked={fields.rejected} setField={setFieldFunction('rejected')} />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date"
                  label={'Date'}
                  format="dd/MM/yyyy"
                  name="birth_date"
                  value={fields.date}
                  onChange={setFieldFunction('date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  inputVariant="outlined"
                  fullWidth
                  error={false}
                  invalidDateMessage={''}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={12} container justify="center">
              <CheckboxField label={'Présent'} checked={fields.present} setField={setFieldFunction('present')} />
            </Grid>
            <Grid container justify="flex-end">
              <Button variant="contained" color="primary" startIcon={<Edit />} onClick={() => editPositionedWorkshop()}>
                Save
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

const WorkshopManagmentForm = injectIntl(WorkshopManagmentFormComponent);

export { WorkshopManagmentForm };
