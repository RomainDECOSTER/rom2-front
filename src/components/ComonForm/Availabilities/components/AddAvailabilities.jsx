import DateFnsUtils from '@date-io/date-fns';
import { IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { MultipleSelector } from 'components/MultipleSelector';
import { Table } from 'components/Table';
import moment from 'moment';
import 'moment/locale/fr';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

moment.locale('fr');

function AddAvailabilitiesComponent({ addAvailabilities, disabled, ...props }) {
  const emptyAvailabilities = {
    day: [],
    start_hour: `${('0' + moment().hours()).slice(-2)}:${('0' + moment().minutes()).slice(-2)}`,
    end_hour: `${('0' + moment().hours()).slice(-2)}:${('0' + moment().minutes()).slice(-2)}`,
  };
  const [newAvailabilities, setNewAvailabilities] = useState(emptyAvailabilities);

  const intl = props.intl.messages.components.availabilities;
  const labels = intl.labels;

  function setFieldFunction(name) {
    return value => {
      setNewAvailabilities(a => ({ ...a, [name]: value }));
    };
  }

  function addNewAvailabilities() {
    addAvailabilities(newAvailabilities.day.map(d => ({ ...newAvailabilities, day: d })));
  }

  const weekDay = moment.weekdays(true).map(day => {
    return {
      label: day,
      value: day,
    };
  });

  const columns = [
    {
      id: 'day',
      align: 'center',
      label: labels.day,
      render: row => (
        <MultipleSelector
          selected={row.day}
          setSelected={setFieldFunction('day')}
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
            value={row.start_hour}
            onChange={value =>
              setFieldFunction('start_hour')(
                `${('0' + value.getHours()).slice(-2)}:${('0' + value.getMinutes()).slice(-2)}`,
              )
            }
            invalidDateMessage={''}
            disabled={disabled}
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
            value={row.end_hour}
            onChange={value =>
              setFieldFunction('end_hour')(
                `${('0' + value.getHours()).slice(-2)}:${('0' + value.getMinutes()).slice(-2)}`,
              )
            }
            invalidDateMessage={''}
            disabled={disabled}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      align: 'center',
      render: () => (
        <IconButton
          disabled={disabled}
          onClick={() => {
            addNewAvailabilities();
            setNewAvailabilities(emptyAvailabilities);
          }}
        >
          <AddCircle color={disabled ? 'disabled' : 'secondary'} />
        </IconButton>
      ),
    },
  ];

  return <Table hideHeader columns={columns} rows={[newAvailabilities]} className="overflow-y-hidden" />;
}

const AddAvailabilities = injectIntl(AddAvailabilitiesComponent);

export { AddAvailabilities };
