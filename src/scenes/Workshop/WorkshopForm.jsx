import { Container, Grid } from '@material-ui/core';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ValueUtils } from 'tools';
import { WorkshopSubmitButton } from './components';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    name: vod(values.name, ''),
    id: vod(values._id, undefined),
  };
}

function WorkshopFormComponent(props) {
  const { reload, mode, values } = props;
  const initialValues = getInitialValues(values);
  const [fields, setFields] = useState({
    ...initialValues,
    errors: {
      name: false,
    },
    loading: false,
  });

  const intl = props.intl.messages.scenes.workshopForm;

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
        <Grid item xs={12} sm={12} md={12}>
          <TextInput
            name="name"
            label={intl.labels.name}
            value={fields.name}
            setField={setFieldWithErrorFunction('name')}
            error={fields.errors.name}
            disabled={fields.loading}
          />
        </Grid>
        <WorkshopSubmitButton
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

const WorkshopForm = injectIntl(WorkshopFormComponent);

export { WorkshopForm };
