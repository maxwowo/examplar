import { notification } from 'antd';

export const notifyError = (
  err: Error,
  description: string
) => {
  console.error(err);

  notification.error(
    {
      message: err.message,
      description: description
    }
  );
};
