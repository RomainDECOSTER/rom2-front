import { Grid, Paper, Typography } from '@material-ui/core';
import { MultipleSelector } from 'components/MultipleSelector';
import { TextInput } from 'components/TextInput';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { WorkshopActioner } from 'services/workshop';

function WorkshopFormComponent(props) {
  const [workshops, setWorkshops] = useState([{ value: '', label: ' ' }]);
  const { student, setStudent } = props;
  const [loading, setLoading] = useState(true);

  const intl = props.intl.messages.scenes.student.workshop;

  useEffect(() => {
    const newworkshops = [...workshops];
    if (loading) {
      WorkshopActioner.list().then(docs => {
        docs.map(doc => {
          newworkshops.push({ value: doc._id, label: doc.name });
          return newworkshops;
        });
        setWorkshops([...newworkshops]);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading]);

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, [name]: value }));
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
          selected={student.workshops}
          setSelected={setFieldFunction('workshops')}
          className="full-width"
        />
        <Grid container item xs={12} sm={12}>
          <TextInput
            name="workshopsComment"
            label={intl.labels.workshopsComment}
            value={student.workshopsComment}
            setField={setFieldFunction('workshopsComment')}
            disabled={student.loading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

const WorkshopFormStudent = injectIntl(WorkshopFormComponent);

export { WorkshopFormStudent };
