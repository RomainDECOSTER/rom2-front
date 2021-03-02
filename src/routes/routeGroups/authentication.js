import { Route } from 'react-router';

import { paths } from 'routes/paths';
import { Login, SetPassword, ForgotPassword } from 'scenes';

const authenticationRoutes = [
  {
    render: Route,
    props: {
      path: paths.front.login,
      exact: true,
      component: Login,
    },
  },
  {
    render: Route,
    props: {
      path: paths.front.setPassword,
      exact: true,
      component: SetPassword,
    },
  },
  {
    render: Route,
    props: {
      path: paths.front.forgotPassword,
      exact: true,
      component: ForgotPassword,
    },
  },
];

export { authenticationRoutes };
