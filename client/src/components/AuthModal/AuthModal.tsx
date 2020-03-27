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
  toggleIsLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = (
  {
    visible,
    handleToggleModal,
    isLogin,
    toggleIsLogin
  }
) => {

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
        isLogin
          ?
          <LoginForm
            toggleIsLogin={toggleIsLogin}
          />
          :
          <SignUpForm
            toggleIsLogin={toggleIsLogin}
          />
      }

    </ToggleableModal>
  );
};

export default Form.create<AuthModalProps>()(AuthModal);
