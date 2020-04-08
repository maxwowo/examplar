import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import isDev from '../tools/devDetect';

export interface ClientResponse<T = any> {
  data: T;
}

export type ClientPromise<T = any> = Promise<ClientResponse<T>>;
export type ClientError = AxiosError;

interface Networking {
  get: (
    url: string,
    config?: AxiosRequestConfig
  ) => ClientPromise;
  delete: (
    url: string,
    config?: AxiosRequestConfig
  ) => ClientPromise;
  post: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => ClientPromise;
  put: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => ClientPromise;
}

// Implementation
const clientInstance: AxiosInstance = Axios.create(
  {
    baseURL: isDev() ? 'http://localhost:8080' : 'https://server.examplar.org',
    timeout: 10000,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

const client: Networking = {
  get: (
    url,
    config
  ) => (
    clientInstance
      .get(
        url,
        config
      )
      .then(
        res => res.data
      )
      .catch(
        (
          err: ClientError
        ) => {
          throw err;
        }
      )
  ),
  delete: (
    url,
    config
  ) => (
    clientInstance
      .delete(
        url,
        config
      )
      .then(
        res => res.data
      )
      .catch(
        (
          err: ClientError
        ) => {
          throw err;
        }
      )
  ),
  post: (
    url,
    data,
    config
  ) => (
    clientInstance
      .post(
        url,
        data,
        config
      )
      .then(
        res => res.data
      )
      .catch(
        (
          err: ClientError
        ) => {
          throw err;
        }
      )
  ),
  put: (
    url,
    data,
    config
  ) => (
    clientInstance
      .put(
        url,
        data,
        config
      )
      .then(
        res => res.data
      )
      .catch(
        (
          err: ClientError
        ) => {
          throw err;
        }
      )
  )
};

export default client;
