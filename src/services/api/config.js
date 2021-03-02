const Config = {
  env: process.env.REACT_APP_ENV || 'development',
  hosts: {
    apiHost: process.env.REACT_APP_API_HOST,
    apiVersion: process.env.REACT_APP_API_VERSION || '',
  },
};

export { Config };
