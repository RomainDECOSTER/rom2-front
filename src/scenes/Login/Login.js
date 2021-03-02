import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LoginForm } from './components';
import { paths } from 'routes';

const LoginScene = props => {
  const history = useHistory();

  useEffect(() => {
    if (props.isAuthenticated) {
      history.push(paths.front.default);
    }
  });

  return <LoginForm />;
};

const mapStateToProps = state => ({
  isAuthenticated: state.Authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({});

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScene);

export { Login };
