import DateFnsUtils from '@date-io/date-fns';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';

function FamilyRessourcesFormComponent(props) {
  const { student, setStudent, type } = props;
  const fields = student.family_ressources;

  const intl = props.intl.messages.scenes.common.family_ressources;

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, family_ressources: { ...f.family_ressources, [name]: value } }));
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
          label={intl.labels.student}
          checked={fields.student ? fields.student : false}
          setField={setFieldFunction('student')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.salary}
          checked={fields.salary ? fields.salary : false}
          setField={setFieldFunction('salary')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.internship}
          checked={fields.internship ? fields.internship : false}
          setField={setFieldFunction('internship')}
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
          label={intl.labels.ASSEDIC}
          checked={fields.ASSEDIC ? fields.ASSEDIC : false}
          setField={setFieldFunction('ASSEDIC')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.ADA}
          checked={fields.ADA ? fields.ADA : false}
          setField={setFieldFunction('ADA')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.AMASE}
          checked={fields.AMASE ? fields.AMASE : false}
          setField={setFieldFunction('AMASE')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.AAH}
          checked={fields.AAH ? fields.AAH : false}
          setField={setFieldFunction('AAH')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.without_ressources}
          checked={fields.without_ressources ? fields.without_ressources : false}
          setField={setFieldFunction('without_ressources')}
          disabled={student.loading}
        />
        <CheckboxField
          label={intl.labels.pension}
          checked={fields.pension ? fields.pension : false}
          setField={setFieldFunction('pension')}
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
          name="CAFNumber"
          label={intl.labels.CAFNumber}
          value={fields.CAFNumber}
          setField={setFieldFunction('CAFNumber')}
          disabled={student.loading}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="obtention_data"
            label={intl.labels.obtention_data}
            format="MM/dd/yyyy"
            name="obtention_data"
            value={fields.obtention_data}
            onChange={setFieldFunction('obtention_data')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="instructing_body"
          label={intl.labels.instructing_body}
          value={fields.instructing_body}
          setField={setFieldFunction('instructing_body')}
          disabled={student.loading}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="referent"
          label={intl.labels.referent}
          value={fields.referent}
          setField={setFieldFunction('referent')}
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
      {type === 'AS' ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="parentWork"
            label={intl.labels.parentWork}
            value={fields.parentWork}
            setField={setFieldFunction('parentWork')}
            disabled={student.loading}
          />
        </Grid>
      ) : null}
    </Paper>
  );
}

const FamilyRessourcesForm = injectIntl(FamilyRessourcesFormComponent);

export { FamilyRessourcesForm };
