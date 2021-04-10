import React from 'react';
import { injectIntl } from 'react-intl';
import { ShortCut } from './components';
function HomeComponent(props) {
  return (
    <div>
      <ShortCut />
    </div>
  );
}

const Home = injectIntl(HomeComponent);

export { Home };
