import { notification } from 'antd';

const notifyError = (title: string, description: string) => {
  notification.error(
    {
      message: title,
      description: description
    }
  );
};

export const notifyUnreachableServer = () => {
  notifyError(
    'Cannot not reach the server',
    'Check your internet connection.'
  );
};
