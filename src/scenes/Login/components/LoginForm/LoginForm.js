import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { toast } from 'components';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { paths } from 'routes';
// import parkkiLogo from './logo-parkki.png';
import { AuthenticationActioner, AuthenticationUtils } from 'services';
import './LoginForm.scss';

const LoginFormComponent = props => {
  const [fields, setFields] = useState({
    email: '',
    password: '',
    keepLoggedIn: false,
    error: {
      email: false,
      password: false,
    },
    loading: false,
  });
  const intl = props.intl.messages.scenes.login;
  const toastMessages = props.intl.messages.toast;
  const history = useHistory();

  function loginUser() {
    if (!AuthenticationUtils.isEmailValid(fields.email)) {
      setFields({ ...fields, error: { ...fields.error, email: true } });
      toast.error(toastMessages.error.invalidEmail);
      return;
    }
    if (fields.password.length === 0) {
      setFields({ ...fields, error: { ...fields.error, password: true } });
      toast.error(toastMessages.error.passwordNeeded);
      return;
    }

    if (!fields.loading) {
      setFields({ ...fields, loading: true });
      props
        .setAuthFromCredentials(fields)
        .then(auth => {
          if (props.lastRoute !== undefined) {
            history.push(props.lastRoute);
          } else {
            history.push(paths.front.default);
          }
        })
        .catch(err => {
          setFields({
            ...fields,
            password: '',
            error: { ...fields.error, email: true, password: true },
            loading: false,
          });
        });
    }
  }

  function handleFieldChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const errors = fields.error;
    if (name === 'email' && errors.email && AuthenticationUtils.isEmailValid(value)) errors.email = false;
    if (name === 'password' && errors.password && value.length > 0) errors.password = false;

    setFields({ ...fields, [name]: value, error: errors });
  }

  function handleKeyPressed(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      loginUser();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="login-paper">
        {/* <Avatar className="login-avatar" src={parkkiLogo} /> */}
        <Typography component="h1" variant="h5">
          {intl.welcomeMessage}
        </Typography>
        <form className="login-form" noValidate>
          <TextField
            disabled={fields.loading}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label={intl.emailLabel}
            name="email"
            autoComplete="email"
            autoFocus
            color="primary"
            onKeyPress={handleKeyPressed}
            onChange={handleFieldChange}
            value={fields.email}
            error={fields.error.email}
          />
          <TextField
            disabled={fields.loading}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label={intl.passwordLabel}
            type="password"
            id="password"
            autoComplete="current-password"
            color="primary"
            onKeyPress={handleKeyPressed}
            onChange={handleFieldChange}
            value={fields.password}
            error={fields.error.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" name="keepLoggedIn" />}
            label={intl.rememberMeLabel}
            onChange={handleFieldChange}
          />
          <Button
            disabled={fields.loading}
            fullWidth
            variant="contained"
            color="secondary"
            className="login-submit"
            onClick={loginUser}
          >
            {intl.loginButtonLabel}
          </Button>
          <Grid container>
            <Grid item xs align="center">
              <RouterLink to={paths.front.forgotPassword} className="login-forgot-password-link">
                {intl.forgotPasswordLink}
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {intl.copyright}
        </Typography>
      </Box>
    </Container>
  );
};

LoginFormComponent.defaultProps = {};

LoginFormComponent.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setAuthFromCredentials: creds => dispatch(AuthenticationActioner.setAuthFromCredentials(creds)),
});

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginFormComponent));

export { LoginForm };
