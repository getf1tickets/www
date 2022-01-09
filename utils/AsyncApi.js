import axios from 'axios';
import to from 'await-to-js';
import { retrieveItem } from '../hooks/useLocalStorage';
import { API, LOCAL_STORAGE } from './config';

const getAuthEntity = () => retrieveItem(LOCAL_STORAGE.AUTH_ENTITY_KEY);

const makeRequest = async (
  method,
  url,
  params,
  data,
  headers,
  entity,
) => {
  const accessToken = entity?.accessToken || getAuthEntity()?.accessToken;
  const [err, response] = await to(axios({
    method,
    url: `${API.BASE_URL}${url.startsWith('/') ? url : `/${url}`}`,
    params,
    data,
    headers: {
      ...(accessToken && { Authorization: `Bearer ${entity?.accessToken || getAuthEntity()?.accessToken}` }),
      ...headers,
    },
  }));

  if (err) {
    return {
      error: err,
      status: -1,
      result: null,
    };
  }

  return {
    error: null,
    status: response?.status,
    result: response?.data,
  };
};

export const get = (
  url,
  params,
  headers,
  entity,
) => makeRequest('GET', url, params, headers, entity);

export const post = (
  url,
  params,
  headers,
  entity,
) => makeRequest('POST', url, params, headers, entity);

export const put = (
  url,
  params,
  headers,
  entity,
) => makeRequest('PUT', url, params, headers, entity);

export const del = (
  url,
  params,
  headers,
  entity,
) => makeRequest('DELETE', url, params, headers, entity);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  post,
  put,
  del,
};
