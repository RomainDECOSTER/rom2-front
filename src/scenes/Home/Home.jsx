import React from 'react';
import { injectIntl } from 'react-intl';

function HomeComponent(props) {
  return <p>Coucou</p>;
}

const Home = injectIntl(HomeComponent);

export { Home };
