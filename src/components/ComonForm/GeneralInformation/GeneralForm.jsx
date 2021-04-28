import DateFnsUtils from '@date-io/date-fns';
import { Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';
import { ComonEnums } from 'services/comon';
import { ArrayUtils, ValueUtils } from 'tools';
import { AddressForm } from './components';

const vod = ValueUtils.valueOrDefault;

function GeneralFormComponent(props) {
  const { data, setData, type, disabled } = props;
  const intl = props.intl.messages.scenes.common.general_information;
  const fields = {
    first_name: vod(data.first_name, ''),
    last_name: vod(data.last_name, ''),
    maiden_name: vod(data.maiden_name, ''),
    birth_date: vod(data.birth_date, new Date()),
    birth_place: vod(data.birth_place, ''),
    origin: vod(data.origin, ''),
    nationality: vod(data.nationality, ''),
    native_language: vod(data.native_language, ''),
    arrival_date: vod(data.arrival_date, new Date()),
    mobile: vod(data.mobile, ''),
    redList: vod(data.redList, false),
    address: vod(data.address, {}),
    email: vod(data.email, ''),
    medical_elements: vod(data.medical_elements, ''),
    sexe: vod(data.sexe, ''),
  };

  const genders = ComonEnums.getGenderArray();

  function setFieldFunction(field) {
    return value => {
      const newGeneralInformation = ArrayUtils.copyJsonObjectArray(fields);
      newGeneralInformation[field] = value;
      setData(newGeneralInformation);
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
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="first_name"
            label={intl.labels.first_name}
            value={fields.first_name}
            setField={setFieldFunction('first_name')}
            disabled={disabled}
            required={false}
          />
        </Grid>
        {type === 'student' ? (
          <Grid item xs={12} sm={12}>
            <TextInput
              name="maiden_name"
              label={intl.labels.maiden_name}
              value={fields.maiden_name}
              setField={setFieldFunction('maiden_name')}
              disabled={disabled}
              required={false}
            />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12}>
          <Selector
            labelId="sexe"
            label={intl.labels.sexe}
            selected={fields.sexe}
            setSelected={setFieldFunction('sexe')}
            items={genders}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="birth_date"
              label={intl.labels.birth_date}
              format="dd/MM/yyyy"
              name="birth_date"
              value={fields.birth_date}
              onChange={setFieldFunction('birth_date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              inputVariant="outlined"
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {type === 'student' ? (
          <Grid item xs={12} sm={12}>
            <TextInput
              name="birth_place"
              label={intl.labels.birth_place}
              value={fields.birth_place}
              setField={setFieldFunction('birth_place')}
              disabled={disabled}
              required={false}
            />
          </Grid>
        ) : null}
        {type === 'student' ? (
          <Grid item xs={12} sm={12}>
            <TextInput
              name="origin"
              label={intl.labels.origin}
              value={fields.origin}
              setField={setFieldFunction('origin')}
              disabled={disabled}
              required={false}
            />
          </Grid>
        ) : null}
        {type === 'student' ? (
          <Grid item xs={12} sm={12}>
            <TextInput
              name="nationality"
              label={intl.labels.nationality}
              value={fields.nationality}
              setField={setFieldFunction('nationality')}
              disabled={disabled}
              required={false}
            />
          </Grid>
        ) : null}
        {type === 'student' ? (
          <Grid item xs={12} sm={12}>
            <TextInput
              name="native_language"
              label={intl.labels.native_language}
              value={fields.native_language}
              setField={setFieldFunction('native_language')}
              disabled={disabled}
              required={false}
            />
          </Grid>
        ) : null}
        {type === 'student' ? (
          <Grid item xs={12} sm={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="arrival_date"
                label={intl.labels.arrival_date}
                format="dd/MM/yyyy"
                name="arrival_date"
                value={fields.arrival_date}
                onChange={setFieldFunction('arrival_date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                inputVariant="outlined"
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12}>
          <TextInput
            name="mobile"
            label={intl.labels.mobile}
            value={fields.mobile}
            setField={setFieldFunction('mobile')}
            disabled={disabled}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="email"
            label={intl.labels.email}
            value={fields.email}
            setField={setFieldFunction('email')}
            disabled={disabled}
            required={false}
          />
        </Grid>
        {type === 'volunteer' ? (
          <Grid item xs={12} sm={12}>
            <TextInput
              name="social_number"
              label={intl.labels.social_number}
              value={fields.social_number}
              setField={setFieldFunction('social_number')}
              disabled={disabled}
              required={false}
            />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12}>
          <TextInput
            name="medical_elements"
            label={intl.labels.medical_elements}
            value={fields.medical_elements}
            setField={setFieldFunction('medical_elements')}
            disabled={disabled}
            required={false}
          />
        </Grid>
        <AddressForm data={fields.address} setData={setFieldFunction('address')} disabled={disabled} />
      </Grid>
    </Paper>
  );
}

const GeneralForm = injectIntl(GeneralFormComponent);

export { GeneralForm };
