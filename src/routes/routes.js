import { Home } from 'scenes';
import { AuthenticatedRoute } from './components';
import { paths } from './paths';
import { authenticationRoutes, campaignRoutes, studentRoutes, userRoutes, workshopRoutes } from './routeGroups';

const otherRoutes = [
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.default,
      exact: true,
      component: Home,
    },
  },
];

const routes = otherRoutes.concat(authenticationRoutes, campaignRoutes, userRoutes, workshopRoutes, studentRoutes);

export { routes };
