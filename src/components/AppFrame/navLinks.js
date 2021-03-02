import { lacleStore } from 'store';

const getNavLinks = () => {
  const customNames = lacleStore.getState().I18n.messages.components.appframe.navbar;

  const navLinks = [];

  return navLinks;
};

export { getNavLinks };
