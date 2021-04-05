import DateFnsUtils from '@date-io/date-fns';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { Selector } from 'components/Selector';
import { Table } from 'components/Table';
import moment from 'moment';
import React from 'react';
import { injectIntl } from 'react-intl';
import { ArrayUtils } from 'tools';
import { AddAvailabilities } from './components/AddAvailabilities';

function AvailabilitiesComponent({ data, setData, disabled, ...props }) {
  const intl = props.intl.messages.components.availabilities;
  const labels = intl.labels;

  function setAvailabilitiesFields(index, field) {
    return value => {
      const newAvailabilities = ArrayUtils.copyJsonObjectArray(data);
      newAvailabilities[index][field] = value;
      setData(newAvailabilities);
    };
  }

  function deleteAvailabilities(index) {
    return () => {
      const newAvailabilities = ArrayUtils.copyJsonObjectArray(data);
      newAvailabilities.splice(index, 1);
      setData(newAvailabilities);
    };
  }

  function addAvailabilities(newData) {
    let newAvailabilities = ArrayUtils.copyJsonObjectArray(data);
    newAvailabilities = newAvailabilities.concat(newData);
    setData(newAvailabilities);
  }

  const weekDay = moment.weekdays(true).map(day => {
    return {
      label: day,
      value: day,
    };
  });
  weekDay.push({
    label: 'tous les jours',
    value: 'ALL_DAY',
  });

  const columns = [
    {
      id: 'day',
      align: 'center',
      label: labels.day,
      render: (row, index) => (
        <Selector
          selected={row.day}
          setSelected={setAvailabilitiesFields(index, 'day')}
          items={weekDay}
          disabled={disabled}
        />
      ),
    },
    {
      id: 'start_hour',
      align: 'center',
      label: labels.startHour,
      render: (row, index) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            ampm={false}
            value={row.start_hour || moment()}
            onChange={value =>
              setAvailabilitiesFields(
                index,
                'start_hour',
              )(`${('0' + value.getHours()).slice(-2)}:${('0' + value.getMinutes()).slice(-2)}`)
            }
            disabled={disabled}
            invalidDateMessage={''}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      id: 'end_hour',
      align: 'center',
      label: labels.endHour,
      render: (row, index) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            ampm={false}
            value={row.end_hour || moment()}
            onChange={value =>
              setAvailabilitiesFields(
                index,
                'end_hour',
              )(`${('0' + value.getHours()).slice(-2)}:${('0' + value.getMinutes()).slice(-2)}`)
            }
            disabled={disabled}
            invalidDateMessage={''}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      id: 'delete',
      label: <Delete className="vertical-align-middle" />,
      render: (row, index) => (
        <ConfirmDialog
          onConfirm={deleteAvailabilities(index)}
          button={({ onClick }) => (
            <IconButton disabled={disabled} onClick={onClick}>
              <Close color={disabled ? 'disabled' : 'error'} />
            </IconButton>
          )}
        ></ConfirmDialog>
      ),
    },
  ];

  return (
    <Paper className="padding-small full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Table columns={columns} rows={data} />
      <AddAvailabilities addAvailabilities={addAvailabilities} disabled={disabled} />
    </Paper>
  );
}

const Availabilities = injectIntl(AvailabilitiesComponent);

export { Availabilities };
