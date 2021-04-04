import { Box, Paper, Typography } from '@material-ui/core';
import { CheckboxField } from 'components/CheckboxField';
import { injectIntl } from 'react-intl';

function SocialMediationFormComponent(props) {
  const { student, setStudent } = props;
  const fields = student.social_mediation;

  const intl = props.intl.messages.scenes.student.social_mediation;

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, social_mediation: { ...f.social_mediation, [name]: value } }));
    };
  }

  return (
    <Paper className="padding-small full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" className="full-width">
        <CheckboxField
          label={intl.labels.active}
          checked={fields.active ? fields.active : false}
          setField={setFieldFunction('active')}
          disabled={fields.loading}
        />
      </Box>
    </Paper>
  );
}

const SocialMediationForm = injectIntl(SocialMediationFormComponent);

export { SocialMediationForm };
