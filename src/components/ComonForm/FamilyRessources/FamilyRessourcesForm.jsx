import DateFnsUtils from '@date-io/date-fns';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';
import { ComonEnums } from 'services/comon';
import { ArrayUtils, ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

function FamilyRessourcesFormComponent(props) {
  const { data, setData, type, disabled, mode } = props;
  const fields = {
    student: vod(data.student, false),
    salary: vod(data.salary, false),
    plain_time: vod(data.plain_time, false),
    middle_time: vod(data.middle_time, false),
    ASSEDIC: vod(data.ASSEDIC, false),
    RSA: vod(data.RSA, false),
    ADA: vod(data.ADA, false),
    AMASE: vod(data.AMASE, false),
    AAH: vod(data.AAH, false),
    without_ressources: vod(data.without_ressources, false),
    pension: vod(data.pension, false),
    other: vod(data.other, false),
    CDD: vod(data.CDD, false),
    CDI: vod(data.CDI, false),
    INTERIM: vod(data.INTERIM, false),
    help: vod(data.help, false),
    has_children: vod(data.has_children, false),
    pre_retirement: vod(data.pre_retirement, false),
    retirement: vod(data.retirement, false),
    internship: vod(data.internship, false),
    CAFNumber: vod(data.CAFNumber, ''),
    instructing_body: vod(data.instructing_body, ''),
    obtention_data: vod(data.obtention_data, new Date()),
    other_details: vod(data.other_details, ''),
    referent: vod(data.referent, ''),
    school: vod(data.school, ''),
    health_number: vod(data.health_number, ''),
    school_path: vod(data.school_path, ''),
    certification: vod(data.certification, ''),
    certification_futur: vod(data.certification_futur, ''),
    work_name: vod(data.work_name, ''),
    parentWork: vod(data.parentWork, ''),
    retirement_number: vod(data.retirement_number, ''),
  };

  const intl = props.intl.messages.scenes.common.family_ressources;

  const school_paths = ComonEnums.getSchoolPathArray();

  function setFieldFunction(field) {
    return value => {
      const newFamilyRessources = ArrayUtils.copyJsonObjectArray(fields);
      newFamilyRessources[field] = value;
      setData(newFamilyRessources);
    };
  }

  return (
    <Paper className="padding-small  full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {mode === 'student' ? intl.title : intl.titleVolunteer}
      </Typography>
      {mode === 'student' ? (
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
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.salary}
            checked={fields.salary ? fields.salary : false}
            setField={setFieldFunction('salary')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.internship}
            checked={fields.internship ? fields.internship : false}
            setField={setFieldFunction('internship')}
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
            label={intl.labels.ASSEDIC}
            checked={fields.ASSEDIC ? fields.ASSEDIC : false}
            setField={setFieldFunction('ASSEDIC')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.ADA}
            checked={fields.ADA ? fields.ADA : false}
            setField={setFieldFunction('ADA')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.AMASE}
            checked={fields.AMASE ? fields.AMASE : false}
            setField={setFieldFunction('AMASE')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.AAH}
            checked={fields.AAH ? fields.AAH : false}
            setField={setFieldFunction('AAH')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.without_ressources}
            checked={fields.without_ressources ? fields.without_ressources : false}
            setField={setFieldFunction('without_ressources')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.pension}
            checked={fields.pension ? fields.pension : false}
            setField={setFieldFunction('pension')}
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
      ) : null}
      {mode === 'volunteer' ? (
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
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.salary}
            checked={fields.salary ? fields.salary : false}
            setField={setFieldFunction('salary')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.internship}
            checked={fields.internship ? fields.internship : false}
            setField={setFieldFunction('internship')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.pre_retirement}
            checked={fields.pre_retirement ? fields.pre_retirement : false}
            setField={setFieldFunction('pre_retirement')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.retirement}
            checked={fields.retirement ? fields.retirement : false}
            setField={setFieldFunction('retirement')}
            disabled={disabled}
          />
          <CheckboxField
            label={intl.labels.has_children}
            checked={fields.has_children ? fields.has_children : false}
            setField={setFieldFunction('has_children')}
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
      ) : null}

      {mode === 'student' ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="CAFNumber"
            label={intl.labels.CAFNumber}
            value={fields.CAFNumber}
            setField={setFieldFunction('CAFNumber')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
      {mode === 'student' ? (
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
              inputVariant="outlined"
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
      ) : null}
      {mode === 'student' ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="instructing_body"
            label={intl.labels.instructing_body}
            value={fields.instructing_body}
            setField={setFieldFunction('instructing_body')}
            disabled={disabled}
          />
        </Grid>
      ) : null}

      {mode === 'student' ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="referent"
            label={intl.labels.referent}
            value={fields.referent}
            setField={setFieldFunction('referent')}
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
      {type === 'AS' ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="parentWork"
            label={intl.labels.parentWork}
            value={fields.parentWork}
            setField={setFieldFunction('parentWork')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
      {mode === 'volunteer' && (fields.salary || fields.internship) ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="work_name"
            label={intl.labels.work_name}
            value={fields.work_name}
            setField={setFieldFunction('work_name')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
      {mode === 'volunteer' && fields.student ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="school"
            label={intl.labels.school}
            value={fields.school}
            setField={setFieldFunction('school')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
      {mode === 'volunteer' && fields.salary ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="certification"
            label={intl.labels.certification}
            value={fields.certification}
            setField={setFieldFunction('certification')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
      {mode === 'volunteer' && fields.student ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="certification_futur"
            label={intl.labels.certification_futur}
            value={fields.certification_futur}
            setField={setFieldFunction('certification_futur')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
      {mode === 'volunteer' && (fields.salary || fields.student || fields.internship) ? (
        <Grid item xs={12} sm={12}>
          <Selector
            labelId="school_path"
            label={intl.labels.school_path}
            selected={fields.school_path}
            setSelected={setFieldFunction('school_path')}
            items={school_paths}
            disabled={fields.loading}
          />
        </Grid>
      ) : null}
      {mode === 'volunteer' && fields.retirement ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="retirement_number"
            label={intl.labels.retirement_number}
            value={fields.retirement_number}
            setField={setFieldFunction('retirement_number')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
    </Paper>
  );
}

const FamilyRessourcesForm = injectIntl(FamilyRessourcesFormComponent);

export { FamilyRessourcesForm };
