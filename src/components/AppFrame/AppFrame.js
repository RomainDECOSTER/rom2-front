import React, { useState } from 'react';
import clsx from 'clsx';
import { CssBaseline, useTheme, useMediaQuery } from '@material-ui/core';
import { injectIntl } from 'react-intl';

import { Header, Navbar } from './components';
import { getNavLinks } from './navLinks';
import './AppFrame.scss';

function removeUnauthorizedNavLinks(navLinks) {
  const authorizedLinks = [];
  for (const navigationLink of navLinks) {
    const link = { ...navigationLink };
    if (navigationLink.items) {
      link.items = removeUnauthorizedNavLinks(navigationLink.items);
    }
    authorizedLinks.push(link);
  }
  return authorizedLinks;
}

function AppFrameComponent(props) {
  const [open, setOpen] = useState(false);
  const smallDevice = useMediaQuery(useTheme().breakpoints.down('sm'));

  function openNavbar() {
    setOpen(true);
  }

  function closeNavbar() {
    setOpen(false);
  }

  const linksToSend = removeUnauthorizedNavLinks(getNavLinks());

  return (
    <div className="appframe-root">
      <CssBaseline />
      <Header navbarOpen={open} handleDrawerOpen={openNavbar} handleDrawerClose={closeNavbar} />
      <Navbar navbarOpen={open} navLinks={linksToSend} openNavbar={openNavbar} />
      {smallDevice && open && <div className="content-shadow" onClick={closeNavbar} />}
      <main
        className={clsx(
          'app-content',
          smallDevice && 'app-content-small-device',
          open ? 'app-content-open' : 'app-content-close',
          open && smallDevice && 'app-content-open-small-device',
        )}
      >
        {props.children}
      </main>
    </div>
  );
}
const AppFrame = injectIntl(AppFrameComponent);

export { AppFrame };
