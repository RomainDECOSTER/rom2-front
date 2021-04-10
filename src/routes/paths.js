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
    workshop: {
      home: '/workshop',
      create: '/workshop/create',
      edit: '/workshop/edit/:id',
    },
    student: {
      home: '/student',
      create: '/student/create',
      edit: '/student/edit/:id',
      profil: '/student/profil/:id',
    },
    volunteer: {
      home: '/volunteer',
      create: '/volunteer/create',
      edit: '/volunteer/edit/:id',
      profil: '/volunteer/profil/:id',
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
    workshop: {
      list: '/workshops',
      get: '/workshop/',
      create: '/workshop',
      edit: '/workshop/',
      delete: '/workshop/',
    },
    student: {
      list: '/students',
      get: '/student/',
      create: '/student',
      edit: '/student/',
      delete: '/student/',
    },
    volunteer: {
      list: '/volunteers',
      get: '/volunteer/',
      create: '/volunteer',
      edit: '/volunteer/',
      delete: '/volunteer/',
    },
  },
};

export { paths };
