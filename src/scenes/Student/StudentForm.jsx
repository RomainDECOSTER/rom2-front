/* eslint-disable prettier/prettier */
import { Box, CircularProgress, Container, Grid } from '@material-ui/core';
import { Availabilities } from 'components/ComonForm/Availabilities/Availabilities';
import { Selector } from 'components/Selector';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CampaignActioner } from 'services/campaign';
import { ValueUtils } from 'tools';
import {
  FamilyRessourcesForm,
  FamilySituationForm,
  GeneralForm,
  LevelForm,
  LifeStateForm,
  RegisterForm,
  SchoolForm,
  SocialMediationForm,
  StudentSubmitButton,
  WorkshopFormStudent
} from './components';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    type: vod(values.type, ''),
    general_information: vod(values.general_information, ''),
    registration_information: vod(values.registration_information, {
      date: new Date(),
      number: 0,
      fresh: false,
      first_date: new Date(),
      know_lacle: '',
      other_known: '',
    }),
    availabilities_information: vod(values.availabilities_information, []),
    family_situation: vod(values.family_situation, {
      alone: false,
      couple: false,
      children: false,
    }),
    family_ressources: vod(values.family_ressources, {
      CAFNumber: '',
      instructing_body: '',
      obtention_data: new Date(),
      other_details: '',
      referent: '',
      school: '',
      health_number: '',
      school_path: '',
      certification: '',
      certification_futur: '',
      work_name: '',
      parentWork: '',
      retirement_number: '',
    }),
    life_state: vod(values.life_state, {
      ESAT_details: '',
      employment_asker_date: new Date(),
      other_details: '',
      comment: '',
      RSA: false,
    }),
    social_mediation: vod(values.social_mediation, {
      active: false,
      details: '',
    }),
    level: vod(values.level, {
      initial_level: '',
      final_level: '',
      certification: '',
      certification_final: '',
      MIFE: '',
      level_comment: '',
    }),
    school: vod(values.school, {
      school_path: '',
      name: '',
      subjet: [''],
      comment: '',
      school_name: '',
      school_comment: '',
      level: '',
      class_room: [''],
      option1: '',
      option2: '',
      option3: '',
    }),
    campaign: vod(values.campaign, ''),
    workshopsComment: vod(values.workshopsComment, ''),
    id: vod(values._id, undefined),
    errors: {
      last_name: false,
      campaign: false,
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
              setSelected={setFieldFunction('type')}
              items={types}
              disabled={fields.loading}
            />
          </Grid>
          <Grid container item xs={12} sm={12}>
            <Grid item xs={6} sm={6} className="padding-small">
              <GeneralForm student={fields} setStudent={setFields} />
              <FamilySituationForm student={fields} setStudent={setFields} />
              <LifeStateForm student={fields} setStudent={setFields} />
              <SocialMediationForm student={fields} setStudent={setFields} />
            </Grid>
            <Grid item xs={6} sm={6} className="padding-small">
              <RegisterForm student={fields} setStudent={setFields} />
              <Availabilities setData={setFieldFunction('availabilities_information')} data={fields.availabilities_information} disabled={fields.loading} />
              <FamilyRessourcesForm student={fields} setStudent={setFields} type={fields.type} />
              {fields.type !== 'AS' ? (
                <LevelForm student={fields} setStudent={setFields} />
              ) : (
                <SchoolForm student={fields} setStudent={setFields} />
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
