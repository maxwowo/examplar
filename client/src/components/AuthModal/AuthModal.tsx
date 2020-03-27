import React from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Logo from '../Logo/Logo';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import ToggleableModal, { ToggleableModalProps } from '../ToggleableModal/ToggleableModal';
import classes from './AuthModal.module.less';

interface AuthModalProps extends ToggleableModalProps, FormComponentProps {
  isLogin: boolean;
}

const AuthModal: React.FC<AuthModalProps> = (
  {
    visible,
    handleToggleModal,
    isLogin
  }
) => {

  const [
    modalIsLogin,
    setModalIsLogin
  ] = React.useState<boolean>(isLogin);

  const toggleModalIsLogin = () => {
    setModalIsLogin(!modalIsLogin);
  };

  return (
    <ToggleableModal
      visible={visible}
      handleToggleModal={handleToggleModal}
      footer={null}
    >
      <Logo
        className={classes.logo}
      />

      {
        modalIsLogin
          ?
          <LoginForm
            toggleModalIsLogin={toggleModalIsLogin}
          />
          :
          <SignUpForm
            toggleModalIsLogin={toggleModalIsLogin}
          />
      }

    </ToggleableModal>
  );
};

export default Form.create<AuthModalProps>()(AuthModal);
