import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Icon, Result, Spin } from 'antd';

import FullPage from '../../components/FullPage/FullPage';
import Centered from '../../components/Centered/Centered';
import userModel from '../../models/user';

interface ActivationPageMatchParams {
  token: string;
}

interface ActivationPageProps extends RouteComponentProps<ActivationPageMatchParams> {

}

const ActivationPage: React.FC<ActivationPageProps> = (
  {
    match,
    history
  }
) => {
  const token = match.params.token;

  const [
    loading,
    setLoading
  ] = React.useState(true);

  const [
    success,
    setSuccess
  ] = React.useState(true);

  const handleSuccessButtonClicked = () => {
    history.push('/');
  };

  const handleWarningButtonClicked = () => {
    window.location.reload();
  };

  userModel
    .activate(token)
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      setSuccess(false);
      setLoading(false);
    });

  return (
    <FullPage
      fixedHeight
    >
      <Centered>
        {loading
          ?
          <Spin
            indicator={
              <Icon
                type='loading'
                spin
              />
            }
            size='large'
          />
          :
          success
            ?
            <Result
              status='success'
              title='Success!'
              subTitle='Your account has been activated.'
              extra={
                <Button
                  type='primary'
                  onClick={handleSuccessButtonClicked}
                >
                  Go back home
                </Button>
              }
            />
            :
            <Result
              status='warning'
              title='Something went wrong :('
              subTitle='Your account could not be activated, please try again later.'
              extra={
                <Button
                  onClick={handleWarningButtonClicked}
                >
                  Try again
                </Button>
              }
            />
        }
      </Centered>
    </FullPage>
  );
};

export default withRouter(ActivationPage);
