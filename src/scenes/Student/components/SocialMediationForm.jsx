import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { CheckboxField } from 'components/CheckboxField';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';
import { ArrayUtils, ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

function SocialMediationFormComponent(props) {
  const { data, setData, disabled } = props;
  const fields = {
    active: vod(data.active, false),
    details: vod(data.details, ''),
  };

  const intl = props.intl.messages.scenes.student.social_mediation;

  function setFieldFunction(field) {
    return value => {
      const newSocialMediation = ArrayUtils.copyJsonObjectArray(fields);
      newSocialMediation[field] = value;
      setData(newSocialMediation);
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
      {fields.active ? (
        <Grid item xs={12} sm={12}>
          <TextInput
            name="details"
            label={intl.labels.details}
            value={fields.details}
            setField={setFieldFunction('details')}
            disabled={disabled}
          />
        </Grid>
      ) : null}
    </Paper>
  );
}

const SocialMediationForm = injectIntl(SocialMediationFormComponent);

export { SocialMediationForm };
