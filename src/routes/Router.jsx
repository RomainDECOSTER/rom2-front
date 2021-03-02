import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { paths } from './paths';
import { AppFrame, toast, Loader } from 'components';
import { UserApi } from 'services';
import { lacleStore } from 'store';

const RouteSwitch = ({ routes }) => (
  <Switch>
    {routes.map(({ render: Render, props }) => (
      <Render key={props.path} {...props} />
    ))}

    <Route path="*">
      <Redirect to={paths.front.login} />
    </Route>
  </Switch>
);

function AuthSwitch({ routes }) {
  return (
    <QueryParamProvider ReactRouterRoute={Route}>
      <AppFrame>
        <RouteSwitch routes={routes} />
      </AppFrame>
    </QueryParamProvider>
  );
}

const AuthLoading = ({ routes }) => {
  function setUserPermissions(render) {
    const authSwitch = <AuthSwitch routes={routes} />;
    UserApi.getUserInfos()
      .then(res => {
        render(authSwitch);
      })
      .catch(() => {
        const reduxState = lacleStore.getState();
        if (reduxState.Authentication.isAuthenticated) {
          const errMessage = reduxState.I18n.messages.toast.error.unableToRetrievePermissions;
          toast.error(errMessage);
          render(authSwitch);
        }
      });
  }

  return <Loader thickness={2} size={150} render={setUserPermissions} />;
};

const RouterComponent = props => {
  const { routes, authenticated } = props;

  return (
    <BrowserRouter>{authenticated ? <AuthLoading routes={routes} /> : <RouteSwitch routes={routes} />}</BrowserRouter>
  );
};

const mapStateToProps = state => ({
  authenticated: state.Authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({});

const Router = connect(mapStateToProps, mapDispatchToProps)(RouterComponent);

export { Router };
