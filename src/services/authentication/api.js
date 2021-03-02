import { XHTTP } from 'services';
import { paths } from 'routes';

const END_POINTS = {
  getAuthFromCredentials: paths.api.auth.login,
  refreshAuthentication: paths.api.auth.refresh,
};

const AuthenticationApi = {
  getAuthFromCredentials: credentials =>
    XHTTP(END_POINTS.getAuthFromCredentials, {
      method: 'post',
      body: {
        email: credentials.email,
        password: credentials.password,
      },
      noAuth: true,
    }),

  refreshAuthentication: refresh_token =>
    XHTTP(END_POINTS.refreshAuthentication, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    }),
};

export { AuthenticationApi };
