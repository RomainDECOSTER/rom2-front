import { toast } from 'components';
import { AuthenticationApi } from './api';
import { UserActioner } from 'services';

const AuthenticationActionTypes = {
  SET_AUTH: 'AUTHENTICATION_SET_AUTH',
  LOG_OUT: 'AUTHENTICATION_LOG_OUT',
};

const AuthenticationActioner = {
  setAuth: auth => ({
    type: AuthenticationActionTypes.SET_AUTH,
    ...auth,
  }),

  logout: () => ({
    type: AuthenticationActionTypes.LOG_OUT,
  }),

  setAuthFromCredentials: credentials => {
    return (dispatch, getState) => {
      return AuthenticationApi.getAuthFromCredentials(credentials)
        .then(authResult => {
          dispatch(
            AuthenticationActioner.setAuth({
              ...authResult,
              keepLoggedIn: credentials.keepLoggedIn,
            }),
          );
          dispatch(
            UserActioner.setUser({
              ...authResult.user,
            }),
          );
          return authResult;
        })
        .catch(error => {
          const messages = getState().I18n.messages.toast.error;
          const msg = error.description ? error.description : messages.errorOccured;
          toast.error(msg);

          throw error;
        });
    };
  },
};

export { AuthenticationActioner, AuthenticationActionTypes };
