import DateFnsUtils from '@date-io/date-fns';
import { Container, Grid, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ValueUtils } from 'tools';
import { ArrayToSelector } from 'tools/arrayToSelector';
import { InterviewSubmitButton } from './components';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}, id, type) {
  return {
    id: vod(values.id, ''),
    interviewed_id: vod(values.interviewed_id, id),
    interviewed_type: vod(values.interviewed_type, type),
    user: vod(values.user, ''),
    campaign: vod(values.campaign, ''),
    interviewed_classmate_id: vod(values.interviewed_classmate_id, ''),
    interviewed_classmate_type: vod(values.interviewed_classmate_type, type === 'student' ? 'volunteer' : 'student'),
    school_subject: vod(values.school_subject, ''),
    school_subject_hours: vod(values.school_subject_hours, {}),
    stop_date: vod(values.stop_date, new Date()),
    volunteer_stop: vod(values.volunteer_stop, false),
    student_stop: vod(values.student_stop, false),
    details: vod(values.details, ''),
    errors: {
      interviewed_id: false,
      interviewed_type: false,
    },
    loading: false,
  };
}

function InterviewFormComponent({ reload, mode, values, templates, type, interviewed_id, ...props }) {
  const initialValues = getInitialValues(values, interviewed_id, type);
  const [fields, setFields] = useState({
    ...initialValues,
  });
  function setClassmatesValues(type) {
    if (type === 'student') {
      return ArrayToSelector.getGeneralInformationNamesArray(templates.volunteers);
    } else {
      return ArrayToSelector.getGeneralInformationNamesArray(templates.students);
    }
  }
  function setInterviewedValues(type) {
    if (type === 'student') {
      return templates.students.find(element => element._id === fields.interviewed_id);
    } else {
      return templates.volunteers.find(element => element._id === fields.interviewed_id);
    }
  }
  const classmates = setClassmatesValues(fields.interviewed_type);
  const interviewed = setInterviewedValues(fields.interviewed_type);
  const users = ArrayToSelector.getNamesArray(templates.users);
  const campaigns = ArrayToSelector.getArray(templates.campaigns);
  const intl = props.intl.messages.scenes.interview.form;

  function setFieldFunction(name) {
    return value => {
      setFields(f => ({ ...f, [name]: value }));
    };
  }
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={12} className="padding-small">
          <Typography className="title" variant="h6">
            {intl.labels.title.replace(
              ':name',
              `${interviewed.general_information.last_name}  ${interviewed.general_information.first_name} (${
                intl.labels[fields.interviewed_type]
              })`,
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Selector
            labelId="interviewed_classmate_id"
            label={intl.labels.interviewed_classmate_id}
            selected={fields.interviewed_classmate_id}
            setSelected={setFieldFunction('interviewed_classmate_id')}
            items={classmates}
            disabled={fields.loading}
          />
          <Selector
            labelId="user"
            label={intl.labels.user}
            selected={fields.user}
            setSelected={setFieldFunction('user')}
            items={users}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Selector
            labelId="campaign"
            label={intl.labels.campaign}
            selected={fields.campaign}
            setSelected={setFieldFunction('campaign')}
            items={campaigns}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextInput
            name="school_subject"
            label={intl.labels.school_subject}
            value={fields.school_subject}
            setField={setFieldFunction('school_subject')}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}></Grid>
        <Grid item xs={12} sm={12} md={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="stop_date"
              label={intl.labels.stop_date}
              format="MM/dd/yyyy"
              name="stop_date"
              value={fields.stop_date}
              onChange={setFieldFunction('stop_date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              inputVariant="outlined"
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <Grid item xs={6} sm={6} md={6}>
            <CheckboxField
              label={intl.labels.student_stop}
              checked={fields.student_stop ? fields.student_stop : false}
              setField={setFieldFunction('student_stop')}
              disabled={fields.loading}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <CheckboxField
              label={intl.labels.volunteer_stop}
              checked={fields.volunteer_stop ? fields.volunteer_stop : false}
              setField={setFieldFunction('volunteer_stop')}
              disabled={fields.loading}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextInput
              name="details"
              label={intl.labels.details}
              value={fields.details}
              setField={setFieldFunction('details')}
              disabled={fields.loading}
            />
          </Grid>
        </Grid>

        <InterviewSubmitButton
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

const InterviewForm = injectIntl(InterviewFormComponent);

export { InterviewForm };
