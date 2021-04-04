import { Button, Container, Fade, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ValueUtils } from 'tools';
import { UserSubmitButton } from './components';
import './User.scss';

const vod = ValueUtils.valueOrDefault;

function getInitialValues(values = {}) {
  return {
    firstname: vod(values.firstname, ''),
    lastname: vod(values.lastname, ''),
    email: vod(values.email, ''),
    roles: vod(values.roles, []),
    id: vod(values._id, undefined),
  };
}

const ListRoles = props => {
  const { user, setUser } = props;

  const handleClick = (event, index) => {
    const newroles = [...user.roles];
    newroles.splice(index, 1);
    setUser({ ...user, roles: newroles });
  };

  return user.roles.map((role, index) => {
    return (
      <div key={index}>
        <button onClick={event => handleClick(event, index)} className="user-central-button">
          <Grid item xs={3} sm={3} className="user-central">
            <AccountCircleIcon color="secondary" fontSize="large" />
            <Typography variant="subtitle1" gutterBottom>
              {role}
            </Typography>
          </Grid>
        </button>
      </div>
    );
  });
};

function UserFormComponent(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { reload, mode, values } = props;
  const initialValues = getInitialValues(values);
  const [fields, setFields] = useState({
    ...initialValues,
    errors: {
      firstname: false,
      lastname: false,
      email: false,
    },
    loading: false,
  });

  const intl = props.intl.messages.scenes.user.form;
  const initRoles = [intl.labels.roles.admin, intl.labels.roles.team, intl.labels.roles.user];

  function setFieldWithErrorFunction(name) {
    return value => {
      setFields(f => ({
        ...f,
        [name]: value,
        errors: { ...f.errors, [name]: f.errors[name] && value !== '' ? false : f.errors[name] },
      }));
    };
  }

  // Menu des roles
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = e => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index) => {
    const role = fields.roles;
    if (!role.includes(initRoles[index])) {
      role.push(initRoles[index]);
      setFields({ ...fields, roles: role });
    }
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <TextInput
            name="firstname"
            label={intl.labels.firstname}
            value={fields.firstname}
            setField={setFieldWithErrorFunction('firstname')}
            error={fields.errors.firstname}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextInput
            name="lastname"
            label={intl.labels.lastname}
            value={fields.lastname}
            setField={setFieldWithErrorFunction('lastname')}
            error={fields.errors.lastname}
            disabled={fields.loading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextInput
            name="email"
            label={intl.labels.email}
            value={fields.email}
            setField={setFieldWithErrorFunction('email')}
            error={fields.errors.email}
            disabled={fields.loading}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={12}>
        <Grid container item xs={12} sm={12} justify="space-between">
          <Typography variant="h6" gutterBottom>
            {intl.labels.roles.title}
          </Typography>
          <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
            <AddIcon color="secondary" fontSize="small" />
          </Button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {initRoles.map((initrole, index) => {
              return (
                <MenuItem key={index} onClick={event => handleMenuItemClick(event, index)} className="user-margin">
                  {initrole}
                </MenuItem>
              );
            })}
          </Menu>
        </Grid>
        <Grid container item xs={12} sm={6} className="user-marginBottom">
          <ListRoles user={fields} setUser={setFields} />
        </Grid>
      </Grid>
      <UserSubmitButton
        fields={fields}
        setFields={setFields}
        initialValues={initialValues}
        reload={reload}
        mode={mode}
      />
    </Container>
  );
}

const UserForm = injectIntl(UserFormComponent);

export { UserForm };
