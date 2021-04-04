import { Home, Settings } from '@material-ui/icons';
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
          Icon: Settings,
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
          Icon: Settings,
          items: [
            {
              label: customNames.list,
              link: paths.front.workshop.home,
            },
            {
              label: customNames.create,
              link: paths.front.workshop.create,
            },
          ],
        },
        {
          label: customNames.campaign,
          Icon: Settings,
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
  ];

  return navLinks;
};

export { getNavLinks };
