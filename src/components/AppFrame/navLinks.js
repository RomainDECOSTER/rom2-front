import {
  AccountCircle,
  AddCircle,
  CalendarViewDay,
  Home,
  HomeWork,
  ImportContacts,
  List,
  School,
  Settings,
} from '@material-ui/icons';
import { paths } from 'routes';
import { lacleStore } from 'store';

const getNavLinks = () => {
  const customNames = lacleStore.getState().I18n.messages.components.appframe.navbar;

  const navLinks = [
    {
      label: customNames.home,
      link: paths.front.default,
      Icon: Home,
    },
    {
      label: customNames.settings,
      Icon: Settings,
      items: [
        {
          label: customNames.users,
          Icon: AccountCircle,
          items: [
            {
              label: customNames.list,
              link: paths.front.user.home,
              Icon: List,
            },
            {
              label: customNames.create,
              link: paths.front.user.create,
              Icon: AddCircle,
            },
          ],
        },
        {
          label: customNames.workshop,
          Icon: HomeWork,
          items: [
            {
              label: customNames.list,
              link: paths.front.workshop.home,
              Icon: List,
            },
            {
              label: customNames.create,
              link: paths.front.workshop.create,
              Icon: AddCircle,
            },
          ],
        },
        {
          label: customNames.campaign,
          Icon: CalendarViewDay,
          items: [
            {
              label: customNames.list,
              link: paths.front.campaign.home,
              Icon: List,
            },
            {
              label: customNames.create,
              link: paths.front.campaign.create,
              Icon: AddCircle,
            },
          ],
        },
      ],
    },
    {
      label: customNames.gestion,
      Icon: ImportContacts,
      items: [
        {
          label: customNames.student,
          Icon: School,
          items: [
            {
              label: customNames.list,
              link: paths.front.student.home,
              Icon: List,
            },
            {
              label: customNames.create,
              link: paths.front.student.create,
              Icon: AddCircle,
            },
          ],
        },
        {
          label: customNames.volunteer,
          Icon: School,
          items: [
            {
              label: customNames.list,
              link: paths.front.volunteer.home,
              Icon: List,
            },
            {
              label: customNames.create,
              link: paths.front.volunteer.create,
              Icon: AddCircle,
            },
          ],
        },
      ],
    },
  ];

  return navLinks;
};

export { getNavLinks };
