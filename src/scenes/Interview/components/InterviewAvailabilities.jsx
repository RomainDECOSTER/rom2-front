import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { Selector } from 'components/Selector';
import { Table } from 'components/Table';
import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';
import { injectIntl } from 'react-intl';
import { ArrayUtils, ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

moment.locale('fr');

function InterviewAvailabilitiesComponent({ setData, data, disabled, ...props }) {
  const fields = {
    day: vod(data.day, ''),
    start_hour: vod(new Date().setTime(data.start_hour), new Date().getTime()),
    end_hour: vod(new Date().setTime(data.end_hour), new Date().getTime()),
  };

  const intl = props.intl.messages.scenes.interview.form;
  const labels = intl.labels;

  function setFieldFunction(field) {
    return value => {
      const newAvailabilites = ArrayUtils.copyJsonObjectArray(fields);
      newAvailabilites[field] = value;
      setData(newAvailabilites);
    };
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
        <Selector
          selected={row.day}
          setSelected={setFieldFunction('day')}
          items={weekDay}
          disabled={disabled}
          FormClassName="multiple-select-container-max-width"
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
            defaultValue={fields.start_hour}
            onChange={value => setFieldFunction('start_hour')(value.getTime())}
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
            onChange={value => setFieldFunction('end_hour')(value.getTime())}
            invalidDateMessage={''}
            disabled={disabled}
          />
        </MuiPickersUtilsProvider>
      ),
    },
  ];

  return (
    <div>
      <h4>{labels.school_subject_hours}</h4>
      <Table hideHeader columns={columns} rows={[fields]} className="overflow-y-hidden" />
    </div>
  );
}

const InterviewAvailabilities = injectIntl(InterviewAvailabilitiesComponent);

export { InterviewAvailabilities };
