import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { MultipleSelector } from 'components/MultipleSelector';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { useEffect } from 'react';
import { injectIntl } from 'react-intl';

function SchoolFormComponent(props) {
  const { student, setStudent } = props;
  const fields = student.school;

  //Level
  const classeRooms = [
    { value: 'CE1', label: 'CE1' },
    { value: 'CE2', label: 'CE2' },
    { value: 'CM1', label: 'CM1' },
    { value: 'CM2', label: 'CM2' },
  ];
  const subjects = [
    { value: 'francais', label: 'Français' },
    { value: 'francaislvl2', label: 'Français Langue de Scolarisation' },
    { value: 'math', label: 'Mathématiques' },
    { value: 'anglais', label: 'Anglais' },
    { value: 'svt', label: 'SVT' },
    { value: 'physique', label: 'Sciences Physiques' },
    { value: 'philosophie', label: 'Philosophie' },
    { value: 'ses', label: 'S.E.S' },
    { value: 'lecture_ecriture_calcul', label: 'Lecture Ecriture Calcul' },
    { value: 'allemand', label: 'Allemand' },
    { value: 'espagnol', label: 'Espagnol' },
    { value: 'histoire', label: 'Histoire Géographie' },
  ];
  const type_school = [
    { value: '', label: '' },
    { value: 'Primaire', label: 'Primaire' },
    { value: 'College', label: 'College' },
    { value: 'Lycee', label: 'Lycee' },
  ];

  const intl = props.intl.messages.scenes.student.school;

  function ArrayToSelectorArray(tab) {
    const newtab = [];
    tab.map(tabs => {
      newtab.push({ value: tabs, label: tabs });
      return newtab;
    });
  }
  useEffect(() => {
    ArrayToSelectorArray(type_school);
  }, [type_school]);

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, school: { ...f.school, [name]: value } }));
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
            labelId="level"
            label={intl.labels.level}
            selected={fields.level}
            setSelected={setFieldFunction('level')}
            items={type_school}
            disabled={student.loading}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <MultipleSelector
            labelId="class_room"
            label={intl.labels.class_room}
            items={classeRooms}
            selected={fields.class_room}
            setSelected={setFieldFunction('class_room')}
            className="full-width"
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="school_name"
            label={intl.labels.school_name}
            value={fields.school_name}
            setField={setFieldFunction('school_name')}
            disabled={student.loading}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="school_comment"
            label={intl.labels.school_comment}
            value={fields.school_comment}
            setField={setFieldFunction('school_comment')}
            disabled={student.loading}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="school_path"
            label={intl.labels.school_path}
            value={fields.school_path}
            setField={setFieldFunction('school_path')}
            disabled={student.loading}
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <MultipleSelector
            labelId="subjet"
            label={intl.labels.subjet}
            items={subjects}
            selected={fields.subjet}
            setSelected={setFieldFunction('subjet')}
            className="full-width"
          />
        </Grid>
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="comment"
            label={intl.labels.comment}
            value={fields.comment}
            setField={setFieldFunction('comment')}
            disabled={student.loading}
          />
        </Grid>
      </Box>
    </Paper>
  );
}

const SchoolForm = injectIntl(SchoolFormComponent);

export { SchoolForm };
