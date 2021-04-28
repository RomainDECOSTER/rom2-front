import DateFnsUtils from '@date-io/date-fns';
import { Container, Grid } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Selector } from 'components/Selector';
import moment from 'moment';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { lacleStore } from 'store';
import { ValueUtils } from 'tools';
import { PositionedWorkshopButtons } from './PositionedWorkshopButtons';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(campaignId, values = {}) {
  return {
    workshop: vod(values.workshop, ''),
    positioned_date: vod(values.positioned_date, moment()),
    animator: vod(values.animator, ''),
    campaign: campaignId,
    id: values.id,
  };
}

function PositionedWorkshopFormComponent(props) {
  const { reload, mode, values, templates } = props;
  const reduxState = lacleStore.getState();
  const campaignId = reduxState.Campaign.current_campaign;
  const initialValues = getInitialValues(campaignId, values);
  const [fields, setFields] = useState({
    ...initialValues,
    errors: {
      workshop: false,
      animator: false,
      positionedDate: false,
    },
    loading: false,
  });

  const intl = props.intl.messages.scenes.positionedWorkshop.form;

  function setFieldWithErrorFunction(name) {
    return value => {
      setFields(f => ({
        ...f,
        [name]: value,
        errors: { ...f.errors, [name]: f.errors[name] && value !== '' ? false : f.errors[name] },
      }));
    };
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Selector
            labelId="workshop"
            label={intl.workshop}
            selected={fields.workshop}
            setSelected={setFieldWithErrorFunction('workshop')}
            items={templates.workshops.map(w => ({ label: w.name, value: w._id }))}
            error={fields.errors.workshop}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              margin="normal"
              id="positioned_date"
              label={intl.positionedDate}
              format="dd/MM/yyyy HH:mm"
              name="positioned_date"
              value={fields.positioned_date}
              onChange={setFieldWithErrorFunction('positioned_date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              inputVariant="outlined"
              fullWidth
              ampm={false}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Selector
            labelId="animator"
            label={intl.animator}
            selected={fields.animator}
            setSelected={setFieldWithErrorFunction('animator')}
            items={templates.animators.map(a => ({ label: `${a.firstname} ${a.lastname}`, value: a._id }))}
            error={fields.errors.animator}
            disabled={fields.loading}
          />
        </Grid>
        <PositionedWorkshopButtons
          fields={fields}
          setFields={setFields}
          initialValues={initialValues}
          reload={reload}
          mode={mode}
        />
      </Grid>
    </Container>
  );
}

const PositionedWorkshopForm = injectIntl(PositionedWorkshopFormComponent);

export { PositionedWorkshopForm };
