import client, { ClientError, ClientResponse } from '../services/networking';

export interface Solution {
  id: number;
  content: string;
  examId: number;
}

interface GetBody {
  solution: Solution;
}

interface CreateBody {
  solution: Solution;
}

const solutionModel = {
  get: (
    solutionId: number
  ): Promise<GetBody> => (
    client
      .get(
        `/solutions/${solutionId}`
      )
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
  ),
  create: (
    content: number,
    examId: number
  ): Promise<CreateBody> => (
    client
      .post(
        '/solutions',
        {
          content: content,
          examId: examId
        }
      )
      .then(
        (
          res: ClientResponse<CreateBody>
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
  ),
  search: (
    examId: number
  ): Promise<GetBody> => (
    client
      .get(
        `/exams/${examId}/solution`
      )
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
  )
};

export default solutionModel;
