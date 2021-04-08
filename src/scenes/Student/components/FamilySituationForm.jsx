import { Box, Paper, Typography } from '@material-ui/core';
import { CheckboxField } from 'components/CheckboxField';
import { injectIntl } from 'react-intl';
import { ArrayUtils, ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

function FamilySituationFormComponent(props) {
  const { data, setData, disabled } = props;
  const fields = {
    alone: vod(data.alone, false),
    couple: vod(data.couple, false),
    children: vod(data.children, false),
  };

  const intl = props.intl.messages.scenes.student.family_situation;

  function setFieldFunction(field) {
    return value => {
      const newFamilySituation = ArrayUtils.copyJsonObjectArray(fields);
      newFamilySituation[field] = value;
      setData(newFamilySituation);
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
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.couple}
          checked={fields.couple ? fields.couple : false}
          setField={setFieldFunction('couple')}
          disabled={disabled}
        />
        <CheckboxField
          label={intl.labels.children}
          checked={fields.children ? fields.children : false}
          setField={setFieldFunction('children')}
          disabled={disabled}
        />
      </Box>
    </Paper>
  );
}

const FamilySituationForm = injectIntl(FamilySituationFormComponent);

export { FamilySituationForm };
