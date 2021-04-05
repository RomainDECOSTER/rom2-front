import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { CheckBox, Delete, Edit } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { StudentActioner } from 'services/student';
import './StudentProfil.scss';

function ProfilSection(props) {
  const { items, thisIntl } = props;
  const intl = thisIntl;
  return (
    <Typography variant="h4" className="section">
      <Typography className="info-title" variant="h4" color="primary">
        {intl.title}
      </Typography>
      {Object.keys(items).map(item => {
        const type = typeof items[item];
        return (
          <DynamicProfilComponent key={item} label={intl.labels[item]} text={items[item]} ptype={type} variant="h6" />
        );
      })}
    </Typography>
  );
}

function DynamicProfilComponent(props) {
  const { label, text, ptype } = props;
  let type = ptype;

  function setGoodValue(text, label, type) {
    if (label && label.includes('Date')) {
      type = 'date';
    }
    switch (type) {
      case 'string':
        return text;
      case 'boolean':
        return <CheckBox color="secondary" />;
      case 'date':
        return text.split('T')[0].split('-').reverse().join('-');
      default:
        return text;
    }
  }

  return (
    <Grid container item xs={12} sm={12}>
      {text && text !== '' ? (
        <Grid className="info" container item spacing={1} xs={12} sm={12}>
          <Grid item xs={6} sm={6}>
            <span className="info-label">{label}</span>
          </Grid>
          <Grid item xs={6} sm={6}>
            <span className="info-text">{setGoodValue(text, label, type)}</span>
          </Grid>
          <div className="info-divider"></div>
        </Grid>
      ) : null}
    </Grid>
  );
}

function StudentProfilComponent(props) {
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(true);
  const id = props.match.params.id;
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
        <Grid container item spacing={0} direction="column" alignItems="center" justify="center" minHeight="200vh">
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="width80">
          <h1>{intl.studentProfil.title}</h1>
          <Grid container item spacing={1} xs={12} sm={12}>
            <Grid item xs={12} sm={6}>
              <Box
                className="section full-width"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <div className="info-img"></div>
                <div className="info-resume">
                  <Typography className="title" variant="h4">
                    {fields.general_information.last_name} {fields.general_information.first_name}
                  </Typography>
                  <Typography className="subtitle" variant="h4">
                    {fields.general_information.email}
                    <br />
                    <br />
                    {fields.general_information.address}
                    <br />
                    {fields.general_information.city}
                    {'  '}
                    {fields.general_information.postal_code}
                  </Typography>
                  <div className="info-buttons">
                    <Button variant="contained" color="primary" startIcon={<Edit />} onClick={onEdit}>
                      {intl.submitButtons.edit}
                    </Button>{' '}
                    <Button variant="contained" color="primary" startIcon={<Delete />} onClick={onDelete}>
                      {intl.submitButtons.delete}
                    </Button>{' '}
                  </div>
                </div>
              </Box>
              <ProfilSection items={fields.registration_information} thisIntl={intl.common.registration_information} />
              <ProfilSection items={fields.family_situation} thisIntl={intl.student.family_situation} />
              <ProfilSection items={fields.life_state} thisIntl={intl.student.life_state} />
              <ProfilSection items={fields.social_mediation} thisIntl={intl.student.social_mediation} />
            </Grid>
            <Grid item xs={12} sm={6}>
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
