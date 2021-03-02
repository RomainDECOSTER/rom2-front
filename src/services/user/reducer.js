import { REHYDRATE } from 'redux-persist';

import { AuthenticationActionTypes, UserActionTypes, AuthenticationUtils } from 'services';

const initialState = {
  email: undefined,
  firstname: undefined,
  lastname: undefined,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return AuthenticationUtils.shouldPersistSession(state, initialState, action.payload);
    case AuthenticationActionTypes.LOG_OUT:
      return initialState;
    case UserActionTypes.SET_USER:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
};

export { UserReducer };
