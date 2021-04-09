/* eslint-disable prettier/prettier */
import { Box, CircularProgress, Container, Grid } from '@material-ui/core';
import { Availabilities, FamilyRessourcesForm, GeneralForm, RegisterForm } from 'components/ComonForm';
import { Selector } from 'components/Selector';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CampaignActioner } from 'services/campaign';
import { ValueUtils } from 'tools';
import {
  FamilySituationForm,
  LevelForm,
  LifeStateForm,
  SchoolForm,
  SocialMediationForm,
  StudentSubmitButton,
  WorkshopFormStudent,
} from './components';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    type: vod(values.type, ''),
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
    workshopsComment: vod(values.workshopsComment, ''),
    id: vod(values._id, undefined),
    errors: {
      last_name: false,
      campaign: false,
      type: false,
    },
    loading: false,
  };
}

function StudentFormComponent(props) {
  const { reload, mode, values } = props;
  const initialValues = getInitialValues(values);
  const [campaigns, setCampaigns] = useState([{ value: '', label: ' ' }]);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState({
    ...initialValues,
  });

  const types = [
    { value: 'AS', label: 'AS' },
    { value: 'FLE', label: 'FLE' },
    { value: 'MSB', label: 'MSB' },
    { value: 'AA', label: 'AA' },
    { value: '', label: ' ' },
  ];

  useEffect(() => {
    const newcampaigns = [...campaigns];
    if (loading) {
      CampaignActioner.list().then(docs => {
        docs.map(doc => {
          newcampaigns.push({ value: doc._id, label: doc.name });
          return newcampaigns;
        });
        setCampaigns([...newcampaigns]);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading, campaigns]);

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
      {loading ? (
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
              disabled={fields.loading}
            />
          </Grid>
          <Grid container item xs={12} sm={12}>
            <Grid item xs={6} sm={6} className="padding-small">
              <GeneralForm
                data={fields.general_information}
                setData={setFieldFunction('general_information')}
                disabled={fields.loading}
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
                campaign={fields.campaign}
                setCampaign={setFieldWithErrorFunction('campaign')}
                disabled={fields.loading}
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
                disabled={fields.loading}
              />
              {fields.type !== 'AS' ? (
                <LevelForm
                  dataLevel={fields.level}
                  setDataLevel={setFieldFunction('level')}
                  dataSchool={fields.school}
                  setDataSchool={setFieldFunction('school')}
                  disabled={fields.loading}
                />
              ) : (
                <SchoolForm data={fields.school} setData={setFieldFunction('school')} disabled={fields.loading} />
              )}
              <WorkshopFormStudent student={fields} setStudent={setFields} />
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
