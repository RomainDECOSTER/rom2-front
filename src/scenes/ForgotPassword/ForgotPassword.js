import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Container, CssBaseline, Typography, TextField, Button, Avatar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { paths } from 'routes';
import { toast } from 'components';
import { UserActioner } from 'services';
// import parkkiLogo from './logo-parkki.png';
import './ForgotPassword.scss';

const ForgotPasswordScene = props => {
  const [success, setSuccess] = useState(false);
  const [emailField, setEmailField] = useState({
    email: '',
    error: false,
    loading: false,
  });
  const intl = props.intl.messages.scenes.forgotPassword;
  const toastMessages = props.intl.messages.toast;
  const history = useHistory();

  function setEmail(event) {
    setEmailField(f => ({
      ...f,
      error: f.error && event.target.value !== '' ? false : f.error,
      email: event.target.value,
    }));
  }

  function getResetLink() {
    if (emailField.email.length === 0) {
      setEmailField(f => ({
        ...f,
        error: true,
      }));
      toast.error(toastMessages.error.emailNeeded);
      return;
    }

    if (!emailField.loading) {
      setEmailField(f => ({ ...f, loading: true }));
      UserActioner.forgotPassword(emailField.email)
        .then(res => {
          setSuccess(true);
        })
        .catch(err => {
          setEmailField({
            email: '',
            error: true,
            loading: false,
          });
        });
    }
  }

  function handleKeyPressed(event) {
    if (event.key === 'Enter' && !success) {
      event.preventDefault();
      getResetLink();
    }
  }

  useEffect(() => {
    if (props.isAuthenticated) {
      history.push(paths.front.default);
    }
  });

  return (
    <Container component="main" maxWidth={success ? 'sm' : 'xs'}>
      <CssBaseline />
      <div className="forgot-password-paper">
        {/* <Avatar className="forgot-password-avatar" src={parkkiLogo} /> */}
        <Typography component="h1" variant="h5">
          {intl.title}
        </Typography>
        {success ? (
          <Alert severity="success" className="forgot-password-success">
            {intl.successMessage}
          </Alert>
        ) : (
          <form className="forgot-password-form" noValidate>
            <TextField
              disabled={emailField.loading}
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
              onChange={setEmail}
              value={emailField.email}
              error={emailField.error}
            />
            <Button
              disabled={emailField.loading}
              fullWidth
              variant="contained"
              color="secondary"
              className="forgot-password-submit"
              onClick={getResetLink}
            >
              {intl.sendLinkButtonLabel}
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.Authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({});

const ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(injectIntl(ForgotPasswordScene));

export { ForgotPassword };
