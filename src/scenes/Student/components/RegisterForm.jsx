import DateFnsUtils from '@date-io/date-fns';
import { Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CheckboxField } from 'components/CheckboxField';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CampaignActioner } from 'services/campaign';

function RegisterFormComponent(props) {
  const [campaigns, setCampaigns] = useState([{ value: '', label: ' ' }]);
  const { student, setStudent } = props;
  const [loading, setLoading] = useState(true);
  const fields = student.registration_information;

  const intl = props.intl.messages.scenes.common.registration_information;

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

  // General
  const how_knows = [
    { value: 'options1', label: 'options1' },
    { value: 'options2', label: 'options2' },
    { value: '', label: ' ' },
  ];

  function setFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, registration_information: { ...f.registration_information, [name]: value } }));
    };
  }
  function setCampaignFieldFunction(name) {
    return value => {
      setStudent(f => ({ ...f, [name]: value }));
    };
  }

  return (
    <Paper className="padding-small full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Grid container item xs={12} sm={12}>
        <Grid item xs={12} sm={12}>
          <Selector
            labelId="campaign"
            label={intl.labels.campaign}
            selected={student.campaign}
            setSelected={setCampaignFieldFunction('campaign')}
            items={campaigns}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CheckboxField
            label={intl.labels.fresh}
            checked={fields.fresh ? fields.fresh : false}
            setField={setFieldFunction('fresh')}
            disabled={student.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date"
              label={intl.labels.date}
              format="MM/dd/yyyy"
              name="date"
              value={fields.date}
              onChange={setFieldFunction('date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="first_date"
              label={intl.labels.first_date}
              format="MM/dd/yyyy"
              name="first_date"
              value={fields.first_date}
              onChange={setFieldFunction('first_date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Selector
            labelId="know_lacle"
            label={intl.labels.know_lacle}
            selected={fields.know_lacle}
            setSelected={setFieldFunction('know_lacle')}
            items={how_knows}
            disabled={student.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            name="other_known"
            label={intl.labels.other_known}
            value={fields.other_known}
            setField={setFieldFunction('other_known')}
            disabled={student.loading}
            required={false}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

const RegisterForm = injectIntl(RegisterFormComponent);

export { RegisterForm };
