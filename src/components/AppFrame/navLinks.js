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
          label: customNames.campaign,
          link: paths.front.campaign,
        },
        {
          label: customNames.create,
          link: paths.front.campaignCreate,
        },
      ],
    },
  ];

  return navLinks;
};

export { getNavLinks };
