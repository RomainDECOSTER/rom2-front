const paths = {
  front: {
    default: '/home',
    login: '/login',
    forgotPassword: '/forgot_password',
    setPassword: '/set_password',
    campaign: {
      home: '/campaign',
      create: '/campaign/create',
      edit: '/campaign/edit/:id',
    },
    user: {
      home: '/user',
      create: '/user/create',
      edit: '/user/edit/:id',
    },
  },
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
        delete: '/users/',
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
