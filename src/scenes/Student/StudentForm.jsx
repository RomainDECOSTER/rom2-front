/* eslint-disable prettier/prettier */
import { Box, CircularProgress, Container, Grid } from '@material-ui/core';
import {
  Availabilities,
  FamilyRessourcesForm,
  GeneralForm,
  RegisterForm,
  WorkshopFormComon,
} from 'components/ComonForm';
import { Selector } from 'components/Selector';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { StudentEnums } from 'services/student';
import { ArrayToSelector, ValueUtils } from 'tools';
import {
  FamilySituationForm,
  LevelForm,
  LifeStateForm,
  SchoolForm,
  SocialMediationForm,
  StudentSubmitButton,
} from './components';
import './style/StudentForm.scss';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    type: vod(values.type, ''),
    draft: vod(values.draft, false),
    general_information: vod(values.general_information, {}),
    registration_information: vod(values.registration_information, {}),
    availabilities_information: vod(values.availabilities_information, []),
    family_situation: vod(values.family_situation, {}),
    family_ressources: vod(values.family_ressources, {}),
    life_state: vod(values.life_state, {}),
    social_mediation: vod(values.social_mediation, {}),
    level: vod(values.level, {}),
    school: vod(values.school, {}),
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

function StudentFormComponent(props) {
  const { reload, mode, values, templates } = props;
  const initialValues = getInitialValues(values);
  const [fields, setFields] = useState({
    ...initialValues,
  });

  const types = StudentEnums.getTypeArray();

  const intl = props.intl.messages.scenes.student;

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
          <Grid container item xs={12} sm={12} className="padding-small">
            <Selector
              labelId="type"
              label={intl.type}
              selected={fields.type}
              setSelected={setFieldWithErrorFunction('type')}
              items={types}
              error={fields.errors.type}
              disabled={fields.loading}
              labelClassName={'grey'}
            />
          </Grid>
          <Grid container item xs={12} sm={12}>
            <Grid item xs={6} sm={6} className="padding-small">
              <GeneralForm
                data={fields.general_information}
                setData={setFieldFunction('general_information')}
                disabled={fields.loading}
                errors={fields.errors}
                type="student"
              />
              <FamilySituationForm
                data={fields.family_situation}
                setData={setFieldFunction('family_situation')}
                disabled={fields.loading}
              />
              <LifeStateForm
                data={fields.life_state}
                setData={setFieldFunction('life_state')}
                disabled={fields.loading}
              />
              <SocialMediationForm
                data={fields.social_mediation}
                setData={setFieldFunction('social_mediation')}
                disabled={fields.loading}
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
              <FamilyRessourcesForm
                data={fields.family_ressources}
                setData={setFieldFunction('family_ressources')}
                type={fields.type}
                mode="student"
                disabled={fields.loading}
              />
              {fields.type !== 'AS' ? (
                <LevelForm
                  dataLevel={fields.level}
                  setDataLevel={setFieldFunction('level')}
                  dataSchool={fields.school}
                  setDataSchool={setFieldFunction('school')}
                  disabled={fields.loading}
                  type={fields.type}
                />
              ) : (
                <SchoolForm data={fields.school} setData={setFieldFunction('school')} disabled={fields.loading} />
              )}
              <WorkshopFormComon
                student={fields}
                setStudent={setFields}
                workshops={ArrayToSelector.getArray(templates.workshops)}
                mode="student"
              />
            </Grid>
          </Grid>

          <StudentSubmitButton
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

const StudentForm = injectIntl(StudentFormComponent);

export { StudentForm };
