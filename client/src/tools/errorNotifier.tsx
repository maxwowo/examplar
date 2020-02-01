import { notification } from 'antd';

const notifyError = (
  err: Error,
  title: string,
  description: string
) => {
  console.error(err);

  notification.error(
    {
      message: title,
      description: description
    }
  );
};

export const notifyConnectionError = (
  err: Error,
  description: string
) => {
  notifyError(
    err,
    'Connection error',
    description
  );
};
