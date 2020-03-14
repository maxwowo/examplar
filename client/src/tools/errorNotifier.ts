import { notification } from 'antd';

export const notifyError = (
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

export const notifyNotImplemented = () => {
  notification.info(
    {
      message: 'Not implemented',
      description: 'This feature has not been implemented yet!'
    }
  );
};
