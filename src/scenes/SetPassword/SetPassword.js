import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Container, CssBaseline, Typography, TextField, Button } from '@material-ui/core';

import { paths } from 'routes';
import { toast } from 'components';
import { UserActioner } from 'services';
// import parkkiLogo from './logo-parkki.png';
import './SetPassword.scss';

const SetPasswordScene = props => {
  const [passwordField, setPasswordField] = useState({
    password: '',
    error: false,
    loading: false,
  });
  const intl = props.intl.messages.scenes.setPassword;
  const toastMessages = props.intl.messages.toast;
  const history = useHistory();

  function changePassword() {
    if (passwordField.password.length === 0) {
      setPasswordField({
        ...passwordField,
        error: true,
      });
      toast.error(toastMessages.error.passwordNeeded);
      return;
    }

    if (!passwordField.loading) {
      const confirmToken = qs.parse(props.location.search).confirm_token;
      setPasswordField({ ...passwordField, loading: true });
      UserActioner.setPassword(confirmToken, passwordField.password)
        .then(res => {
          history.push(paths.front.default);
        })
        .catch(err => {
          setPasswordField({
            password: '',
            error: true,
            loading: false,
          });
        });
    }
  }

  function handleFieldChange(event) {
    const value = event.target.value;

    let error = passwordField.error;
    if (error && value.length > 0) {
      error = false;
    }

    setPasswordField({ ...passwordField, password: value, error });
  }

  function handleKeyPressed(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      changePassword();
    }
  }

  useEffect(() => {
    if (props.isAuthenticated) {
      history.push(paths.front.default);
    }
    const confirmToken = qs.parse(props.location.search).confirm_token;
    if (!confirmToken) {
      history.push(paths.front.default);
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="set-password-paper">
        {/* <img className="set-password-logo" src={parkkiLogo} alt="Parkki" /> */}
        <Typography component="h1" variant="h6">
          {intl.enterPassword}
        </Typography>
        <form className="set-password-form" noValidate>
          <TextField
            disabled={passwordField.loading}
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
            value={passwordField.password}
            error={passwordField.error}
          />
          <Button
            disabled={passwordField.loading}
            fullWidth
            variant="contained"
            color="secondary"
            className="set-password-button"
            onClick={changePassword}
          >
            {intl.changePasswordButtonLabel}
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.Authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({});

const SetPassword = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SetPasswordScene));

export { SetPassword };
