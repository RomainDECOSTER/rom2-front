import React from 'react';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';

import { lacleStore, persistor } from './store';
import { Router, routes } from './routes';
import { LacleMuiTheme } from './themes';
import { IntlWrapper, ToastContainer } from './components';
import './App.scss';

function App() {
  return (
    <Provider store={lacleStore}>
      <PersistGate persistor={persistor}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={LacleMuiTheme}>
            <IntlWrapper>
              <Router routes={routes} />
              <ToastContainer />
            </IntlWrapper>
          </ThemeProvider>
        </StylesProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
