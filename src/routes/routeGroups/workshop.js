import { paths } from 'routes';
import { AuthenticatedRoute } from 'routes/components';
import { WorkshopCreate, WorkshopEdit, WorkshopList } from 'scenes';

const workshopRoutes = [
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.workshop.home,
      exact: true,
      component: WorkshopList,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.workshop.create,
      exact: true,
      component: WorkshopCreate,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.workshop.edit,
      exact: true,
      component: WorkshopEdit,
    },
  },
];

export { workshopRoutes };
