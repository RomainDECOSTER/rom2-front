import { paths } from 'routes';
import { AuthenticatedRoute } from 'routes/components';
import { UserCreate, UserEdit, UserList } from 'scenes';

const userRoutes = [
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.user.home,
      exact: true,
      component: UserList,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.user.create,
      exact: true,
      component: UserCreate,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.user.edit,
      exact: true,
      component: UserEdit,
    },
  },
];

export { userRoutes };
