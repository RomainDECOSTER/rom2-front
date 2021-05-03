import {
  AccessibilityNew,
  AccountCircle,
  CalendarToday,
  CalendarViewDay,
  Home,
  HomeWork,
  ImportContacts,
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
            },
            {
              label: customNames.create,
              link: paths.front.user.create,
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
            },
            {
              label: customNames.create,
              link: paths.front.workshop.create,
            },
            {
              label: 'Ateliers prévus',
              Icon: CalendarToday,
              items: [
                {
                  label: customNames.list,
                  link: paths.front.workshop.positionedWorkshop.home,
                },
                {
                  label: customNames.create,
                  link: paths.front.workshop.positionedWorkshop.create,
                },
              ],
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
            },
            {
              label: customNames.create,
              link: paths.front.campaign.create,
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
            },
            {
              label: customNames.create,
              link: paths.front.student.create,
            },
          ],
        },
        {
          label: customNames.volunteer,
          Icon: AccessibilityNew,
          items: [
            {
              label: customNames.list,
              link: paths.front.volunteer.home,
            },
            {
              label: customNames.create,
              link: paths.front.volunteer.create,
            },
          ],
        },
      ],
    },
  ];

  return navLinks;
};

export { getNavLinks };
