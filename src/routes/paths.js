const paths = {
  front: { default: '/home', login: '/login', forgotPassword: '/forgot_password', setPassword: '/set_password' },
  api: {
    auth: {
      login: '/auth/login',
      refresh: '/auth/request_access_token',
    },
    user: {
      infos: '/users/me',
      setPassword: '/users/password',
      forgotPassword: '/users/forgot_password',
      factoriot: {
        list: '/users',
        create: '/users',
        edit: '/users/',
        get: '/users/',
      },
    },
    campaign: {
      list: '/campaigns',
      get: '/campaign/',
      create: '/campaign',
      edit: '/campaign/',
      delete: '/campaign/',
    },
  },
};

export { paths };
