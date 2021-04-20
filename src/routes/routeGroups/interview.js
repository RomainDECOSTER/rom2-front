import { paths } from 'routes';
import { AuthenticatedRoute } from 'routes/components';
import { InterviewCreate, InterviewEdit } from 'scenes';

const interviewRoutes = [
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.interview.create,
      exact: true,
      component: InterviewCreate,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.interview.edit,
      exact: true,
      component: InterviewEdit,
    },
  },
];

export { interviewRoutes };
