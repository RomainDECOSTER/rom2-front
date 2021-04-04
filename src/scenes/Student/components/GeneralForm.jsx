import DateFnsUtils from '@date-io/date-fns';
import { Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';

function GeneralFormComponent(props) {
  const { student, setStudent } = props;
  const fields = student.general_information;
  const intl = props.intl.messages.scenes.common.general_information;

  // General
  const neighbourhoods = [
    { value: 'Quartier 1', label: 'Quartier 1' },
    { value: 'Quartier 2', label: 'Quartier 2' },
    { value: '', label: ' ' },
  ];
  const genders = [
    { value: 'F', label: 'Femme' },
    { value: 'M', label: 'Homme' },
    { value: '', label: ' ' },
  ];

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, general_information: { ...f.general_information, [name]: value } }));
    };
  }

  return (
    <Paper className="full-width marginB20 padding-small">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Grid container item xs={12} sm={12}>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="last_name"
            label={intl.labels.last_name}
            value={fields.last_name}
            setField={setFieldFunction('last_name')}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="first_name"
            label={intl.labels.first_name}
            value={fields.first_name}
            setField={setFieldFunction('first_name')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="maiden_name"
            label={intl.labels.maiden_name}
            value={fields.maiden_name}
            setField={setFieldFunction('maiden_name')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Selector
            labelId="gender"
            label={intl.labels.gender}
            selected={fields.gender}
            setSelected={setFieldFunction('gender')}
            items={genders}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="birthday"
              label={intl.labels.birthday}
              format="MM/dd/yyyy"
              name="birthday"
              value={fields.birthday}
              onChange={setFieldFunction('birthday')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="birthtown"
            label={intl.labels.birthtown}
            value={fields.birthtown}
            setField={setFieldFunction('birthtown')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="origin"
            label={intl.labels.origin}
            value={fields.origin}
            setField={setFieldFunction('origin')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="nationality"
            label={intl.labels.nationality}
            value={fields.nationality}
            setField={setFieldFunction('nationality')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="langage"
            label={intl.labels.langage}
            value={fields.langage}
            setField={setFieldFunction('langage')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="entry_date"
              label={intl.labels.entry_date}
              format="MM/dd/yyyy"
              name="entry_date"
              value={fields.entry_date}
              onChange={setFieldFunction('entry_date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="mobile"
            label={intl.labels.mobile}
            value={fields.mobile}
            setField={setFieldFunction('mobile')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="email"
            label={intl.labels.email}
            value={fields.email}
            setField={setFieldFunction('email')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="health_problems"
            label={intl.labels.health_problems}
            value={fields.health_problems}
            setField={setFieldFunction('health_problems')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="address"
            label={intl.labels.address}
            value={fields.address}
            setField={setFieldFunction('address')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="city"
            label={intl.labels.city}
            value={fields.city}
            setField={setFieldFunction('city')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="postal_code"
            label={intl.labels.postal_code}
            value={fields.postal_code}
            setField={setFieldFunction('postal_code')}
            disabled={fields.loading}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Selector
            labelId="neighbourhood"
            label={intl.labels.neighbourhood}
            selected={fields.neighbourhood}
            setSelected={setFieldFunction('neighbourhood')}
            items={neighbourhoods}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CheckboxField
            label={intl.labels.primary_neighbourhood}
            checked={fields.primary_neighbourhood ? fields.primary_neighbourhood : false}
            setField={setFieldFunction('primary_neighbourhood')}
            disabled={fields.loading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

const GeneralForm = injectIntl(GeneralFormComponent);

export { GeneralForm };
