import client, { ClientErrorBody, ClientResponse } from '../services/networking';
import qs from 'query-string';

export interface University {
  id: number,
  name: string,
  domain: string
}

interface SearchBody {
  universities: University[]
  query: string
}

export const searchByName = (query: string): Promise<SearchBody> => (
  client
    .get(
      qs.stringifyUrl(
        {
          url: '/universities',
          query: {
            name: query
          }
        }
      )
    )
    .then(
      (res: ClientResponse<SearchBody>) => res.data
    )
    .catch(
      (err: ClientErrorBody) => {
        throw err;
      }
    )
);
