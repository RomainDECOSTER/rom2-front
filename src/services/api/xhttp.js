import { Config } from './config';
import { lacleStore } from 'store';
import { toast } from 'components';
import { AuthenticationActioner } from 'services';
import { AuthenticationApi } from 'services';

const isTokenExpired = token => {
  if (!token || !token.expires_at) return true;
  const now = new Date().getTime();
  const expiryDate = token.expires_at * 1000;
  return now > expiryDate;
};

const getAccessToken = async () => {
  const accessTokenObject = lacleStore.getState().Authentication.access_token;
  if (isTokenExpired(accessTokenObject)) {
    const refreshTokenObject = lacleStore.getState().Authentication.refresh_token;
    if (isTokenExpired(refreshTokenObject)) {
      toast.error(lacleStore.getState().I18n.messages.toast.error.sessionExpired);
      lacleStore.dispatch(AuthenticationActioner.logout());
      return null;
    }
    try {
      const newTokens = await AuthenticationApi.refreshAuthentication(refreshTokenObject.token);
      lacleStore.dispatch(AuthenticationActioner.setAuth(newTokens));
      return newTokens.access_token.token;
    } catch (e) {
      return null;
    }
  }
  return accessTokenObject.token;
};

const getTokenHeaders = async params => {
  if (params.noAuth) return {};
  if (params.headers && params.headers.Authorization) return { Authorization: params.headers.Authorization };

  const accessToken = await getAccessToken();
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const XHTTP = async (endPoint, params = {}, host) => {
  const tokenHeaders = await getTokenHeaders(params);
  const apiHost = Config.hosts[host] ? Config.hosts[host] : Config.hosts.apiHost;
  const fullUrl = `${apiHost}${Config.hosts.apiVersion}${endPoint}`;

  if (params.body && typeof params.body !== 'string' && params.noStringify !== true) {
    params.body = JSON.stringify(params.body);
  }

  return new Promise((resolve, reject) => {
    fetch(fullUrl, {
      ...params,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...tokenHeaders,
        ...params.headers,
      },
    })
      .then(response => {
        if (response.status < 400) {
          if (response.status === 204) {
            return resolve(null);
          }
          return response.json().then(resolve).catch(reject);
        }
        response.json().then(reject).catch(reject);
      })
      .catch(reject);
  });
};

const XHTTPBlob = async (endPoint, params = {}, host, acceptContentType = 'text/csv') => {
  const tokenHeaders = await getTokenHeaders(params);
  const apiHost = Config.hosts[host] ? Config.hosts[host] : Config.hosts.apiHost;
  const fullUrl = `${apiHost}${Config.hosts.apiVersion}${endPoint}`;

  if (params.body && typeof params.body !== 'string' && params.noStringify !== true) {
    params.body = JSON.stringify(params.body);
  }

  return new Promise((resolve, reject) => {
    fetch(fullUrl, {
      ...params,
      headers: {
        'Content-Type': 'application/json',
        Accept: acceptContentType,
        ...tokenHeaders,
        ...params.headers,
      },
    })
      .then(response => {
        if (response.status < 400) {
          if (response.status === 204) {
            return resolve(null);
          }
          return response.blob().then(resolve).catch(reject);
        }
        response.json().then(reject).catch(reject);
      })
      .catch(reject);
  });
};

export { XHTTP, XHTTPBlob };
