/* eslint-disable prettier/prettier */
import { Box, CircularProgress, Container, Grid, Paper } from '@material-ui/core';
import {
  Availabilities,
  FamilyRessourcesForm,
  GeneralForm,
  RegisterForm,
  WorkshopFormComon,
} from 'components/ComonForm';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { VolunteerEnums } from 'services/volunteer';
import { ArrayToSelector, ValueUtils } from 'tools';
import { SubjectForm, VolunteerSubmitButton } from './components';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    type: vod(values.type, ''),
    general_information: vod(values.general_information, {}),
    registration_information: vod(values.registration_information, {}),
    availabilities_information: vod(values.availabilities_information, []),
    proposed_subject: vod(values.proposed_subject, []),
    family_ressources: vod(values.family_ressources, {}),
    life_state: vod(values.life_state, {}),
    campaign: vod(values.campaign, ''),
    workshop: vod(values.workshop, {}),
    id: vod(values._id, undefined),
    uuid: vod(values.uuid, undefined),
    errors: {
      last_name: false,
      campaign: false,
      type: false,
    },
    loading: false,
  };
}

function VolunteerFormComponent(props) {
  const { reload, mode, values, templates } = props;
  const initialValues = getInitialValues(values);
  const [fields, setFields] = useState({
    ...initialValues,
  });

  const intl = props.intl.messages.scenes.volunteer.form;

  const interventions = VolunteerEnums.getOtherInterventionArray();

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
      {fields.loading ? (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" className="heigh-circular">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="full-width">
          <Grid container item xs={12} sm={12}>
            <Grid item xs={6} sm={6} className="padding-small">
              <GeneralForm
                data={fields.general_information}
                setData={setFieldFunction('general_information')}
                disabled={fields.loading}
                type="student"
              />
              <FamilyRessourcesForm
                data={fields.family_ressources}
                setData={setFieldFunction('family_ressources')}
                type={fields.type}
                mode="volunteer"
                disabled={fields.loading}
              />
              <WorkshopFormComon
                student={fields}
                setStudent={setFields}
                workshops={ArrayToSelector.getArray(templates.workshops) || {}}
              />
            </Grid>
            <Grid item xs={6} sm={6} className="padding-small">
              <RegisterForm
                data={fields.registration_information}
                setData={setFieldFunction('registration_information')}
                root={{ campaign: fields.campaign, draft: fields.draft }}
                setRoot={setFieldWithErrorFunction}
                errors={fields.errors}
                disabled={fields.loading}
                campaigns={ArrayToSelector.getArray(templates.campaigns) || {}}
              />
              <Availabilities
                setData={setFieldFunction('availabilities_information')}
                data={fields.availabilities_information}
                disabled={fields.loading}
              />
              <SubjectForm
                setData={setFieldFunction('proposed_subject')}
                data={fields.proposed_subject}
                disabled={fields.loading}
              />
              <Paper className="full-width marginB20 padding-small">
                <Grid item xs={12} sm={12}>
                  <Selector
                    labelId="other_intervention"
                    label={intl.other_intervention}
                    selected={fields.other_intervention}
                    setSelected={setFieldFunction('other_intervention')}
                    items={interventions}
                    disabled={fields.loading}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextInput
                    name="comment"
                    label={intl.comment}
                    value={fields.comment}
                    setField={setFieldFunction('comment')}
                    disabled={fields.loading}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <VolunteerSubmitButton
            fields={fields}
            setFields={setFields}
            initialValues={initialValues}
            reload={reload}
            mode={mode}
          />
        </Box>
      )}
    </Container>
  );
}

const VolunteerForm = injectIntl(VolunteerFormComponent);

export { VolunteerForm };
