import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';
import { ArrayUtils, ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

function LevelFormComponent(props) {
  const { dataLevel, setDataLevel, dataSchool, setDataSchool, disabled } = props;
  const fields = {
    initial_level: vod(dataLevel.initial_level, ''),
    final_level: vod(dataLevel.final_level, ''),
    certification: vod(dataLevel.certification, ''),
    certification_final: vod(dataLevel.certification_final, ''),
    MIFE: vod(dataLevel.MIFE, ''),
    level_comment: vod(dataLevel.level_comment, ''),
  };
  const schoolFields = {
    school_path: vod(dataSchool.school_path, ''),
    name: vod(dataSchool.name, ''),
    comment: vod(dataSchool.comment, ''),
  };

  //Level
  const levels = [
    { value: '', label: '' },
    { value: 'A1.1', label: 'A1.1' },
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'RAN', label: 'RAN' },
    { value: 'ET1', label: 'ET1' },
    { value: 'ET2', label: 'ET2' },
    { value: 'ET3', label: 'ET3' },
  ];
  const mifeoptions = [
    { value: '', label: '' },
    { value: 'I', label: 'I' },
    { value: 'II', label: 'II' },
    { value: 'III', label: 'III' },
    { value: 'IV', label: 'IV' },
    { value: 'V', label: 'V' },
    { value: 'V bis', label: 'V bis' },
    { value: 'VI', label: 'VI' },
    { value: 'VI bis', label: 'VI bis' },
    { value: 'VII', label: 'VII' },
    { value: 'VII bis', label: 'VII bis' },
  ];
  const certifications = [
    { value: '', label: '' },
    { value: 'TCF', label: 'TCF' },
    { value: 'DILF', label: 'DILF' },
    { value: 'DELF', label: 'DELF' },
    { value: 'CFG', label: 'CFG' },
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
  ];
  const type_school = [
    { value: '', label: '' },
    { value: 'Primaire', label: 'Primaire' },
    { value: 'College', label: 'College' },
    { value: 'Lycee', label: 'Lycee' },
  ];

  const intl = props.intl.messages.scenes.student.level;

  function setSchoolFieldFunction(field) {
    return value => {
      const newSchool = ArrayUtils.copyJsonObjectArray(schoolFields);
      newSchool[field] = value;
      setDataSchool(newSchool);
    };
  }

  function setFieldFunction(field) {
    return value => {
      const newLevel = ArrayUtils.copyJsonObjectArray(fields);
      newLevel[field] = value;
      setDataLevel(newLevel);
    };
  }
  return (
    <Paper className="padding-small full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        className="full-width"
      >
        <Grid container item xs={12} sm={12}>
          <Selector
            labelId="initial_level"
            label={intl.labels.initial_level}
            selected={fields.initial_level}
            setSelected={setFieldFunction('initial_level')}
            items={levels}
            disabled={disabled}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <Selector
            labelId="final_level"
            label={intl.labels.final_level}
            selected={fields.final_level}
            setSelected={setFieldFunction('final_level')}
            items={levels}
            disabled={disabled}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <Selector
            labelId="MIFE"
            label={intl.labels.MIFE}
            selected={fields.MIFE}
            setSelected={setFieldFunction('MIFE')}
            items={mifeoptions}
            disabled={disabled}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <Selector
            labelId="certification"
            label={intl.labels.certification}
            selected={fields.certification}
            setSelected={setFieldFunction('certification')}
            items={certifications}
            disabled={disabled}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <Selector
            labelId="certification_final"
            label={intl.labels.certification_final}
            selected={fields.certification_final}
            setSelected={setFieldFunction('certification_final')}
            items={certifications}
            disabled={disabled}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="school_path"
            label={intl.labels.school_path}
            value={schoolFields.school_path}
            setField={setSchoolFieldFunction('school_path')}
            disabled={disabled}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="name"
            label={intl.labels.name}
            value={schoolFields.name}
            setField={setSchoolFieldFunction('name')}
            disabled={disabled}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="comment"
            label={intl.labels.comment}
            value={schoolFields.comment}
            setField={setSchoolFieldFunction('comment')}
            disabled={disabled}
          />
        </Grid>
      </Box>
    </Paper>
  );
}

const LevelForm = injectIntl(LevelFormComponent);

export { LevelForm };
