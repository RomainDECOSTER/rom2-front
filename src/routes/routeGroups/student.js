import { paths } from 'routes';
import { AuthenticatedRoute } from 'routes/components';
import { StudentCreate, StudentEdit, StudentList, StudentProfil } from 'scenes';

const studentRoutes = [
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.student.home,
      exact: true,
      component: StudentList,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.student.create,
      exact: true,
      component: StudentCreate,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.student.edit,
      exact: true,
      component: StudentEdit,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.student.profil,
      exact: true,
      component: StudentProfil,
    },
  },
];

export { studentRoutes };
