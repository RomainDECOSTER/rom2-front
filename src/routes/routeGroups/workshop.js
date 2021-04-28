import { paths } from 'routes';
import { AuthenticatedRoute } from 'routes/components';
import {
  PositionedWorkshopCreate,
  PositionedWorkshopEdit,
  PositionedWorkshopList,
  WorkshopCreate,
  WorkshopEdit,
  WorkshopList,
} from 'scenes';

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
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.workshop.positionedWorkshop.home,
      exact: true,
      component: PositionedWorkshopList,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.workshop.positionedWorkshop.create,
      exact: true,
      component: PositionedWorkshopCreate,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.workshop.positionedWorkshop.edit,
      exact: true,
      component: PositionedWorkshopEdit,
    },
  },
];

export { workshopRoutes };
