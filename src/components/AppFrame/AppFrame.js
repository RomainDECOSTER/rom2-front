import { CssBaseline, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import './AppFrame.scss';
import { Header, Navbar } from './components';
import { getNavLinks } from './navLinks';

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
      <Header
        navbarOpen={open}
        handleDrawerOpen={openNavbar}
        handleDrawerClose={closeNavbar}
        campaigns={props.campaigns}
      />
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
