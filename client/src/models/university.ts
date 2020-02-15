import qs from 'query-string';

import client, { ClientError, ClientResponse } from '../services/networking';

export interface University {
  id: number;
  name: string;
  domain: string;
}

export interface GetBody {
  university: University;
}

export interface SearchBody {
  universities: University[];
  query: string;
}

export const get = (
  universityId: number
): Promise<GetBody> => (
  client
    .get(`/universities/${universityId}`)
    .then(
      (
        res: ClientResponse<GetBody>
      ) => (
        res.data
      )
    )
    .catch(
      (
        err: ClientError
      ) => {
        throw err;
      }
    )
);

export const search = (
  query: string
): Promise<SearchBody> => (
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
      (
        res: ClientResponse<SearchBody>
      ) => (
        res.data
      )
    )
    .catch(
      (
        err: ClientError
      ) => {
        throw err;
      }
    )
);
