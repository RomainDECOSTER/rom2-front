import { Box, Paper, Typography } from '@material-ui/core';
import { CheckboxField } from 'components/CheckboxField';
import { injectIntl } from 'react-intl';

function FamilySituationFormComponent(props) {
  const { student, setStudent } = props;
  const fields = student.family_situation;

  const intl = props.intl.messages.scenes.student.family_situation;

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, family_situation: { ...f.family_situation, [name]: value } }));
    };
  }

  return (
    <Paper className="full-width marginB20 padding-small">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" className="full-width">
        <CheckboxField
          label={intl.labels.alone}
          checked={fields.alone ? fields.alone : false}
          setField={setFieldFunction('alone')}
          disabled={fields.loading}
        />
        <CheckboxField
          label={intl.labels.couple}
          checked={fields.couple ? fields.couple : false}
          setField={setFieldFunction('couple')}
          disabled={fields.loading}
        />
        <CheckboxField
          label={intl.labels.children}
          checked={fields.children ? fields.children : false}
          setField={setFieldFunction('children')}
          disabled={fields.loading}
        />
      </Box>
    </Paper>
  );
}

const FamilySituationForm = injectIntl(FamilySituationFormComponent);

export { FamilySituationForm };
