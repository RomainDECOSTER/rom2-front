import { REHYDRATE } from 'redux-persist';

import { AuthenticationActionTypes } from './actioner';
import { AuthenticationUtils } from './utils';

const SESSION_DURATION = 3600000; // 1h

const initialState = {
  sessionExpiredAt: undefined,
  refresh_token: undefined,
  access_token: undefined,
  isAuthenticated: false,
  keepLoggedIn: false,
};

const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return AuthenticationUtils.shouldPersistSession(state, initialState, action.payload);
    case AuthenticationActionTypes.LOG_OUT:
      return initialState;
    case AuthenticationActionTypes.SET_AUTH:
      return {
        ...state,
        access_token: action.access_token,
        refresh_token: action.refresh_token,
        keepLoggedIn: action.keepLoggedIn,
        sessionExpiredAt: new Date().getTime() + SESSION_DURATION,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export { AuthenticationReducer };
