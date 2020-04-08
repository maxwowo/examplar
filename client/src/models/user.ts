import client, { ClientError, ClientResponse } from '../services/networking';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface CreateBody {
  token: string;
}

const userModel = {
  create: (
    username: string,
    email: string,
    password: string
  ): Promise<CreateBody> => (
    client
      .post(
        '/users',
        {
          username: username,
          email: email,
          password: password
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
  )
};

export default userModel;
