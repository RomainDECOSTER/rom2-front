import { Button, Grid, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { MultipleSelector } from 'components/MultipleSelector';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import { injectIntl } from 'react-intl';

function DispoList(props) {
  const { student, setStudent, index, intl } = props;
  const initialesvalues = student.availabilities_information[index];
  const [fields] = useState({
    ...initialesvalues,
  });
  const days = [
    { value: 'lundi', label: 'lundi' },
    { value: 'mardi', label: 'mardi' },
    { value: '', label: ' ' },
  ];
  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, level: { ...f.level, [name]: value } }));
    };
  }

  return (
    <Grid container item xs={12} sm={12}>
      <MultipleSelector
        labelId="workshops"
        label={intl.labels.day}
        items={days}
        selected={fields.day}
        setSelected={setFieldFunction('day', index)}
        className="full-width"
      />
      <Grid item container xs={12} sm={12} spacing={2}>
        <Grid item container xs={6} sm={6}>
          <TextInput
            name="start_hour"
            label={intl.labels.start_hour}
            value={fields.start_hour}
            setField={setFieldFunction('start_hour')}
            disabled={student.loading}
          />
        </Grid>
        <Grid item container xs={6} sm={6}>
          <TextInput
            name="end_hour"
            label={intl.labels.end_hour}
            value={fields.end_hour}
            setField={setFieldFunction('end_hour')}
            disabled={student.loading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function DisponibilitiesFormComponent(props) {
  const { student, setStudent } = props;

  const intl = props.intl.messages.scenes.common.availabilities_information;

  function handleClick() {}

  return (
    <Paper className="padding-small full-width marginB20">
      <Grid container item xs={12} sm={12}>
        <Typography variant="h6" gutterBottom>
          {intl.title}
        </Typography>
        <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
          <AddIcon color="secondary" fontSize="small" />
        </Button>
      </Grid>
      <Grid container item xs={12} sm={12}>
        <DispoList student={student} setStudent={setStudent} intl={intl} />
      </Grid>
    </Paper>
  );
}

const DisponibilitiesForm = injectIntl(DisponibilitiesFormComponent);

export { DisponibilitiesForm };
