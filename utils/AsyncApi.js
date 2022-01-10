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
      status: err.response?.status || -1,
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
) => makeRequest('GET', url, params, null, headers, entity);

export const post = (
  url,
  data,
  headers,
  entity,
) => makeRequest('POST', url, null, data, headers, entity);

export const put = (
  url,
  data,
  headers,
  entity,
) => makeRequest('PUT', url, null, data, headers, entity);

export const del = (
  url,
  data,
  headers,
  entity,
) => makeRequest('DELETE', url, null, data, headers, entity);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  post,
  put,
  del,
};
