import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Logo from '../Logo/Logo';
import Space from '../Space/Space';
import ToggleableModal, { ToggleableModalProps } from '../ToggleableModal/ToggleableModal';
import classes from './SignUpModal.module.less';

interface SignUpModalProps extends ToggleableModalProps,
  RouteComponentProps,
  FormComponentProps {

}

const SignUpModal: React.FC<SignUpModalProps> = (
  {
    visible,
    handleToggleModal,
    form
  }
) => {
  const FORM_ID = 'sign-up-modal-form';

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    form.validateFields();
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
      <Form
        onSubmit={handleSubmit}
        id={FORM_ID}
      >
        {form.getFieldDecorator(
          'username',
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please enter your username.'
              }
            ]
          }
        )(
          <Input
            placeholder='Username'
            className={classes.formItem}
          />
        )}

        {form.getFieldDecorator(
          'email',
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please enter the email.'
              }
            ]
          }
        )(
          <Input
            placeholder='Email address'
            className={classes.formItem}
          />
        )}

        {form.getFieldDecorator(
          'password',
          {
            rules: [
              {
                required: true,
                type: 'integer',
                message: 'Please enter the password.'
              }
            ]
          }
        )(
          <Input
            placeholder='Password'
            type='password'
            className={classes.formItem}
          />
        )}

        {form.getFieldDecorator(
          'passwordConfirm',
          {
            rules: [
              {
                required: true,
                type: 'integer',
                message: 'Please confirm the password.'
              }
            ]
          }
        )(
          <Input
            placeholder='Confirm password'
            type='password'
            className={classes.formItem}
          />
        )}
      </Form>

      <Button
        type='primary'
        className={classes.button}
      >
        Sign Up
      </Button>

      <div
        className={classes.switchModal}
      >
        <Typography.Text>
          Have an account?
        </Typography.Text>
        <Space/>
        <Typography.Text
          className={classes.signInLink}
        >
          Sign In
        </Typography.Text>
      </div>
    </ToggleableModal>
  );
};

export default withRouter(Form.create<SignUpModalProps>()(SignUpModal));
