import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { CheckBox, Delete, Edit } from '@material-ui/icons';
import { AvailabilitiesProfil } from 'components/ComonProfil';
import { ConfirmDialog } from 'components/ConfirmDialog';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { StudentActioner } from 'services/student';
import './style/StudentProfil.scss';

function ProfilSection(props) {
  const { items, thisIntl } = props;
  const intl = thisIntl;
  return (
    <Typography component={'div'} variant="h4" className="section">
      <Typography className="info-title" variant="h4" color="primary">
        {intl.title}
      </Typography>
      <SectionDataPrint items={items} intl={intl} />
    </Typography>
  );
}

function SectionDataPrint(props) {
  const { items, intl } = props;

  function testing(type, text, item) {
    if (Array.isArray(text)) {
      type = 'array';
    }
    if (type === 'object') {
      return <SectionDataPrint key={item} items={text} intl={intl} />;
    }
    return (
      <DynamicProfilComponent key={item} label={intl.labels[item]} intl={intl} text={text} ptype={type} variant="h6" />
    );
  }

  return Object.keys(items).map(item => {
    const type = typeof items[item];
    return testing(type, items[item], item);
  });
}

function DynamicProfilComponent(props) {
  const { label, text, ptype } = props;
  let type = ptype;

  function setGoodValue(text, label, type) {
    if (!text || text === '') {
      return null;
    }
    if (text && Array.isArray(text)) {
      type = 'array';
    }
    if (label && label.includes('Date')) {
      type = 'date';
    }
    switch (type) {
      case 'string':
        return text;
      case 'boolean':
        return <CheckBox color="primary" />;
      case 'date':
        return moment(text).format('DD-MM-YYYY');
      case 'array':
        return text.join(' - ');
      default:
        return text;
    }
  }

  return (
    <Grid container item xs={12} sm={12}>
      {text && text !== '' ? <LabelValue label={label} value={setGoodValue(text, label, type)} /> : null}
    </Grid>
  );
}

function LabelValue(props) {
  const { label, value } = props;
  return (
    <Grid className="info" container item spacing={1} xs={12} sm={12}>
      <Grid item xs={6} sm={6}>
        <span className="info-label">{label}</span>
      </Grid>
      <Grid item xs={6} sm={6}>
        <span className="info-text">{value}</span>
      </Grid>
      <div className="info-divider"></div>
    </Grid>
  );
}

function StudentProfilComponent(props) {
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = props;
  const intl = props.intl.messages.scenes;
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      StudentActioner.get(id).then(docs => {
        setFields(docs);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading, id]);

  function onEdit() {
    history.push(paths.front.student.edit.replace(':id', id));
  }

  function onDelete() {
    setLoading(true);
    StudentActioner.delete(id)
      .then(() => {
        setLoading(false);
        history.push(paths.front.student.home);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {loading ? (
        <Grid container item spacing={0} direction="column" alignItems="center" justify="center">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="width80">
          <h1>{intl.student.profil.title.toUpperCase()} </h1>
          <Grid container item spacing={1} xs={12} sm={12}>
            <Grid item xs={12} sm={6}>
              <Box
                className="section full-width"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography className="title" variant="h6">
                  {fields.type}
                </Typography>
                <div className="info-img"></div>
                <div className="info-resume">
                  <Typography className="title" variant="h4">
                    {fields.general_information.last_name} {fields.general_information.first_name}
                  </Typography>
                  <Typography className="subtitle" variant="h4">
                    {fields.general_information.email}
                    <br />
                    {fields.general_information.mobile}
                    <br />
                    <br />
                    {fields.general_information.address ? (
                      <div>
                        {fields.general_information.address.address_description}
                        <br />
                        {fields.general_information.address.city}
                        {'  '}
                        {fields.general_information.address.zip_code}
                      </div>
                    ) : null}
                  </Typography>
                  <div className="info-buttons">
                    <Button variant="contained" color="primary" startIcon={<Edit />} onClick={onEdit}>
                      {intl.submitButtons.edit}
                    </Button>{' '}
                    <ConfirmDialog
                      onConfirm={onDelete}
                      button={({ onClick }) => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Delete />}
                          onClick={onClick}
                          disabled={fields.loading}
                        >
                          {intl.submitButtons.delete}
                        </Button>
                      )}
                    />
                  </div>
                </div>
              </Box>
              <ProfilSection items={fields.registration_information} thisIntl={intl.common.registration_information} />
              <ProfilSection items={fields.level} thisIntl={intl.student.level} />
              <ProfilSection items={fields.school} thisIntl={intl.student.school} />
              <ProfilSection items={fields.family_situation} thisIntl={intl.student.family_situation} />
              <ProfilSection items={fields.life_state} thisIntl={intl.student.life_state} />
              <ProfilSection items={fields.social_mediation} thisIntl={intl.student.social_mediation} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AvailabilitiesProfil data={fields.availabilities_information} disabled={fields.loading} />
              <ProfilSection items={fields.general_information} thisIntl={intl.common.general_information} />
              <ProfilSection items={fields.family_ressources} thisIntl={intl.common.family_ressources} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

const StudentProfil = injectIntl(StudentProfilComponent);

export { StudentProfil };
