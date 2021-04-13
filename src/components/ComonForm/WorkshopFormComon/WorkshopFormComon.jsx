import { Grid, Paper, Typography } from '@material-ui/core';
import { MultipleSelector } from 'components/MultipleSelector';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';

function WorkshopFormComponent(props) {
  const { student, setStudent, workshops } = props;

  const intl = props.intl.messages.scenes.student.workshop;

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, workshop: { ...f.workshop, [name]: value } }));
    };
  }

  return (
    <Paper className="padding-small full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Grid container item xs={12} sm={12}>
        <MultipleSelector
          labelId="workshops"
          label={intl.labels.workshops}
          items={workshops}
          selected={student.workshop.workshops}
          setSelected={setFieldFunction('workshops')}
          className="full-width"
        />
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="workshopsComment"
            label={intl.labels.workshopsComment}
            value={student.workshop.workshops_comment}
            setField={setFieldFunction('workshopsComment')}
            disabled={student.loading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

const WorkshopFormComon = injectIntl(WorkshopFormComponent);

export { WorkshopFormComon };
