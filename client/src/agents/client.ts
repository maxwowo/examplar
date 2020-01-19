import Axios, { AxiosError, AxiosInstance, AxiosPromise } from 'axios';

// Types
export interface ClientResponse<T = any> {
  data: T;
}

export type ClientPromise<T = any> = Promise<ClientResponse<T>>

export interface ClientErrorBody {
  code: number,
  message: string
}

export interface ClientError {
  error: ClientErrorBody
}

interface Client {
  get: (url: string) => ClientPromise;
  delete: (url: string) => ClientPromise;
  post: (url: string, data?: any) => ClientPromise;
  put: (url: string, data?: any) => ClientPromise;
}

// Implementation
const clientInstance: AxiosInstance = Axios.create(
  {
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

const processRequest = (
  request: (url: string, data?: any) => AxiosPromise,
  url: string,
  data?: any
): ClientPromise => (
  request(url, data)
    .then(res => res.data)
    .catch(
      (err: AxiosError<ClientError>) => {
        throw err.response!.data.error;
      }
    )
);

const client: Client = {
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
