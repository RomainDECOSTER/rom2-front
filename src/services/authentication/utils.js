const AuthenticationUtils = {
  shouldPersistSession: (state, initialState, payload) => {
    if (payload && payload.Authentication) {
      const authState = payload.Authentication;
      if (authState.keepLoggedIn === true || authState.sessionExpiredAt > new Date().getTime()) return state;
    }
    return { ...initialState };
  },

  isEmailValid: (email = '') => {
    const emailRegex = new RegExp(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    );
    return email.match(emailRegex);
  },
};

export { AuthenticationUtils };
