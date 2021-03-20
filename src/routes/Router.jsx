import { AppFrame, Loader, toast } from 'components';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { UserApi } from 'services';
import { CampaignActioner } from 'services/campaign';
import { lacleStore } from 'store';
import { QueryParamProvider } from 'use-query-params';
import { paths } from './paths';

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

function AuthSwitch({ routes, campaigns }) {
  return (
    <QueryParamProvider ReactRouterRoute={Route}>
      <AppFrame campaigns={campaigns}>
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
        CampaignActioner.list().then(campaigns => {
          render(<AuthSwitch routes={routes} campaigns={campaigns} />);
        });
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
