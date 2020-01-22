import client, { ClientErrorBody, ClientResponse } from '../services/networking';
import qs from 'query-string';

export interface University {
  id: string,
  name: string,
  domain: string
}

interface SearchBody {
  universities: University[]
}

export const getAllUniversities = (): Promise<University[]> => (
  searchByName('')
);

export const searchByName = (query: string): Promise<University[]> => (
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
      (res: ClientResponse<SearchBody>) => res.data.universities
    )
    .catch(
      (err: ClientErrorBody) => {
        throw err;
      }
    )
);
