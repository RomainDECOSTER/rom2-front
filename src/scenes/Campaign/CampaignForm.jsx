import { Container, Grid } from '@material-ui/core';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ValueUtils } from 'tools';
import { CampaignSubmitButton } from './components/CampaignSubmitButton';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    name: vod(values.name, ''),
    description: vod(values.description, ''),
    id: vod(values._id, undefined),
  };
}

function CampaignEditFormComponent(props) {
  const { reload, mode, values } = props;
  const initialValues = getInitialValues(values);
  const [fields, setFields] = useState({
    ...initialValues,
    errors: {
      name: false,
    },
    loading: false,
  });

  const intl = props.intl.messages.scenes.campaign.edit;

  function setFieldFunction(name) {
    return value => {
      setFields(f => ({ ...f, [name]: value }));
    };
  }

  function setFieldWithErrorFunction(name) {
    return value => {
      setFields(f => ({
        ...f,
        [name]: value,
        errors: { ...f.errors, [name]: f.errors[name] && value !== '' ? false : f.errors[name] },
      }));
    };
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <TextInput
            name="name"
            label={intl.labels.name}
            value={fields.name}
            setField={setFieldWithErrorFunction('name')}
            error={fields.errors.name}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextInput
            name="description"
            label={intl.labels.description}
            value={fields.description}
            setField={setFieldFunction('description')}
            disabled={fields.loading}
          />
        </Grid>
        <CampaignSubmitButton
          fields={fields}
          setFields={setFields}
          initialValues={initialValues}
          reload={reload}
          mode={mode}
        />
      </Grid>
    </Container>
  );
}

const CampaignForm = injectIntl(CampaignEditFormComponent);

export { CampaignForm };
