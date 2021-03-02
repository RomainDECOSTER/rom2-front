import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';

import { appReducers } from './services';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'lacle-backoffice',
      })
    : compose;

const persistConfig = {
  key: 'lacle-backoffice',
  storage,
  whitelist: ['Authentication'],
};

const persistedReducer = persistReducer(persistConfig, appReducers);
const enhancer = composeEnhancers(applyMiddleware(thunk));

const configureStore = () => {
  const store = createStore(persistedReducer, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./services', () => {
      const nextReducer = require('./services/reducers').appReducers;

      store.replaceReducer(nextReducer);
    });
  }
  return store;
};

const lacleStore = configureStore();
const persistor = persistStore(lacleStore);

export { persistor, lacleStore };
