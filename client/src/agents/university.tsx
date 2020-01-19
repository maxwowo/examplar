import client, { ClientErrorBody, ClientResponse } from './client';

export interface University {
  id: string,
  name: string,
  domain: string
}

interface GetAllResponseBody {
  universities: University[]
}

export const getAllUniversities = (): Promise<University[] | void> => (
  client
    .get('/universities')
    .then((res: ClientResponse<GetAllResponseBody>) => res.data.universities)
    .catch((err: ClientErrorBody) => {
      throw err;
    })
);
