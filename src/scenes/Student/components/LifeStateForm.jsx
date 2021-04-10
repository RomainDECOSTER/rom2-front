import DateFnsUtils from '@date-io/date-fns';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';
import { ArrayUtils, ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

function LifeStateFormComponent(props) {
  const { data, setData, disabled } = props;
  const fields = {
    salary: vod(data.salary, false),
    plain_time: vod(data.plain_time, false),
    middle_time: vod(data.middle_time, false),
    CDD: vod(data.CDD, false),
    CDI: vod(data.CDI, false),
    INTERIM: vod(data.INTERIM, false),
    help: vod(data.help, false),
    employment_asker: vod(data.employment_asker, false),
    home_children: vod(data.home_children, false),
    country_asker: vod(data.country_asker, false),
    home: vod(data.home, false),
    AAH: vod(data.AAH, false),
    ESAT: vod(data.ESAT, false),
    young_alone: vod(data.young_alone, false),
    other: vod(data.other, false),
    RSA: vod(data.RSA, false),
    ESAT_details: vod(data.ESAT_details, ''),
    employment_asker_date: vod(data.employment_asker_date, new Date()),
    other_details: vod(data.other_details, ''),
    comment: vod(data.comment, ''),
  };

  const intl = props.intl.messages.scenes.student.life_state;

  function setFieldFunction(field) {
    return value => {
      const newLifeState = ArrayUtils.copyJsonObjectArray(fields);
      newLifeState[field] = value;
      setData(newLifeState);
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
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.plain_time}
          checked={fields.plain_time ? fields.plain_time : false}
          setField={setFieldFunction('plain_time')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.middle_time}
          checked={fields.middle_time ? fields.middle_time : false}
          setField={setFieldFunction('middle_time')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.CDD}
          checked={fields.CDD ? fields.CDD : false}
          setField={setFieldFunction('CDD')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.CDI}
          checked={fields.CDI ? fields.CDI : false}
          setField={setFieldFunction('CDI')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.INTERIM}
          checked={fields.INTERIM ? fields.INTERIM : false}
          setField={setFieldFunction('INTERIM')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.help}
          checked={fields.help ? fields.help : false}
          setField={setFieldFunction('help')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.employment_asker}
          checked={fields.employment_asker ? fields.employment_asker : false}
          setField={setFieldFunction('employment_asker')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.country_asker}
          checked={fields.country_asker ? fields.country_asker : false}
          setField={setFieldFunction('country_asker')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.home}
          checked={fields.home ? fields.home : false}
          setField={setFieldFunction('home')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.AAH}
          checked={fields.AAH ? fields.AAH : false}
          setField={setFieldFunction('AAH')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.ESAT}
          checked={fields.ESAT ? fields.ESAT : false}
          setField={setFieldFunction('ESAT')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.young_alone}
          checked={fields.young_alone ? fields.young_alone : false}
          setField={setFieldFunction('young_alone')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.RSA}
          checked={fields.RSA ? fields.RSA : false}
          setField={setFieldFunction('RSA')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.other}
          checked={fields.other ? fields.other : false}
          setField={setFieldFunction('other')}
          disabled={disabled}
        />
      </Box>
      {fields.ESAT ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="ESAT_details"
            label={intl.labels.ESAT_details}
            value={fields.ESAT_details}
            setField={setFieldFunction('ESAT_details')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
      {fields.other ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="other_details"
            label={intl.labels.other_details}
            value={fields.other_details}
            setField={setFieldFunction('other_details')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
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
            inputVariant="outlined"
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
          disabled={disabled}
        />
      </Grid>
    </Paper>
  );
}

const LifeStateForm = injectIntl(LifeStateFormComponent);

export { LifeStateForm };
