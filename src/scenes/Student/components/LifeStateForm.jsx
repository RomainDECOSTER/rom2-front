import DateFnsUtils from '@date-io/date-fns';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';

function LifeStateFormComponent(props) {
  const { student, setStudent } = props;
  const fields = student.life_state;

  const intl = props.intl.messages.scenes.student.life_state;

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, life_state: { ...f.life_state, [name]: value } }));
    };
  }

  return (
    <Paper className="padding-small  full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className="full-width marginB20"
        flexWrap="wrap"
      >
        <CheckboxField
          label={intl.labels.salary}
          checked={fields.salary ? fields.salary : false}
          setField={setFieldFunction('salary')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.plain_time}
          checked={fields.plain_time ? fields.plain_time : false}
          setField={setFieldFunction('plain_time')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.middle_time}
          checked={fields.middle_time ? fields.middle_time : false}
          setField={setFieldFunction('middle_time')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.CDD}
          checked={fields.CDD ? fields.CDD : false}
          setField={setFieldFunction('CDD')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.CDI}
          checked={fields.CDI ? fields.CDI : false}
          setField={setFieldFunction('CDI')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.INTERIM}
          checked={fields.INTERIM ? fields.INTERIM : false}
          setField={setFieldFunction('INTERIM')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.help}
          checked={fields.help ? fields.help : false}
          setField={setFieldFunction('help')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.employment_asker}
          checked={fields.employment_asker ? fields.employment_asker : false}
          setField={setFieldFunction('employment_asker')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.country_asker}
          checked={fields.country_asker ? fields.country_asker : false}
          setField={setFieldFunction('country_asker')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.home}
          checked={fields.home ? fields.home : false}
          setField={setFieldFunction('home')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.AAH}
          checked={fields.AAH ? fields.AAH : false}
          setField={setFieldFunction('AAH')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.ESAT}
          checked={fields.ESAT ? fields.ESAT : false}
          setField={setFieldFunction('ESAT')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.young_alone}
          checked={fields.young_alone ? fields.young_alone : false}
          setField={setFieldFunction('young_alone')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.RSA}
          checked={fields.RSA ? fields.RSA : false}
          setField={setFieldFunction('RSA')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.other}
          checked={fields.other ? fields.other : false}
          setField={setFieldFunction('other')}
          disabled={student.loading}
        />
      </Box>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="ESAT_details"
          label={intl.labels.ESAT_details}
          value={fields.ESAT_details}
          setField={setFieldFunction('ESAT_details')}
          disabled={student.loading}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="other_details"
          label={intl.labels.other_details}
          value={fields.other_details}
          setField={setFieldFunction('other_details')}
          disabled={student.loading}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="employment_asker_date"
            label={intl.labels.employment_asker_date}
            format="MM/dd/yyyy"
            name="employment_asker_date"
            value={fields.employment_asker_date}
            onChange={setFieldFunction('employment_asker_date')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="comment"
          label={intl.labels.comment}
          value={fields.comment}
          setField={setFieldFunction('comment')}
          disabled={student.loading}
        />
      </Grid>
    </Paper>
  );
}

const LifeStateForm = injectIntl(LifeStateFormComponent);

export { LifeStateForm };
