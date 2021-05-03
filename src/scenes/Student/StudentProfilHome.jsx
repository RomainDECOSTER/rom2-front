import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { WorkshopManagment } from 'components/ComonProfil/WorkshopManagement';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { InterviewList } from 'scenes';
import { StudentActioner } from 'services/student';
import { StudentProfil } from './StudentProfil';
import './style/StudentProfilHome.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function StudentProfilHomeComponent(props) {
  const [value, setValue] = React.useState(0);
  const id = props.match.params.id;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <AppBar position="static">
        <Tabs
          className="tabs-background"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <LinkTab label="Profil" href="/profil" {...a11yProps(0)} />
          <LinkTab label="Entretien" href="/interview" {...a11yProps(1)} />
          <LinkTab label="Atelier" href="/workshop" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <StudentProfil id={id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InterviewList interviewedId={id} type="student" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WorkshopManagment entityId={id} getActioner={StudentActioner.get} />
      </TabPanel>
    </div>
  );
}

const StudentProfilHome = injectIntl(StudentProfilHomeComponent);

export { StudentProfilHome };
