import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { paths } from 'routes';

const AuthenticatedRoute = props => {
  const [authorized, setAuthorized] = useState(false);
  const { exact, path, component, authenticated, permission } = props;
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push(paths.front.login);
    }

    setAuthorized(true);
  }, [authenticated, permission, history, path]);

  return authorized && <Route exact={exact} path={path} component={component} />;
};

const mapStateToProps = state => ({
  authenticated: state.Authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({});

const ConnectedAuthenticatedRoute = connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);

export { ConnectedAuthenticatedRoute as AuthenticatedRoute };
