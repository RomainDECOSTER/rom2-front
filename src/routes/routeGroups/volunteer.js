import { paths } from 'routes';
import { AuthenticatedRoute } from 'routes/components';
import { VolunteerCreate, VolunteerEdit, VolunteerList, VolunteerProfil } from 'scenes';

const volunteerRoutes = [
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.volunteer.home,
      exact: true,
      component: VolunteerList,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.volunteer.create,
      exact: true,
      component: VolunteerCreate,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.volunteer.edit,
      exact: true,
      component: VolunteerEdit,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.volunteer.profil,
      exact: true,
      component: VolunteerProfil,
    },
  },
];

export { volunteerRoutes };
