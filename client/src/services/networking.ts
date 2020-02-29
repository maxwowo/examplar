import Axios, { AxiosError, AxiosInstance } from 'axios';

import isDev from '../tools/devDetect';

// Types
export interface ClientResponse<T = any> {
  data: T;
}

export type ClientPromise<T = any> = Promise<ClientResponse<T>>;
export type ClientError = AxiosError;

interface Networking {
  get: (url: string) => ClientPromise;
  delete: (url: string) => ClientPromise;
  post: (url: string, data?: any) => ClientPromise;
  put: (url: string, data?: any) => ClientPromise;
}

// Implementation
const clientInstance: AxiosInstance = Axios.create(
  {
    baseURL: isDev() ? 'localhost:8080' : 'server.examplar.org',
    timeout: 1000,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

const processRequest = (
  request: (url: string, data?: any) => ClientPromise,
  url: string,
  data?: any
): ClientPromise => (
  request(url, data)
    .then(res => res.data)
    .catch(
      (err: ClientError) => {
        throw err;
      }
    )
);

const client: Networking = {
  get: url => (
    processRequest(clientInstance.get, url)
  ),
  delete: url => (
    processRequest(clientInstance.delete, url)
  ),
  post: (url, data) => (
    processRequest(clientInstance.post, url, data)
  ),
  put: (url, data) => (
    processRequest(clientInstance.put, url, data)
  )
};

export default client;
