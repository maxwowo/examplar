import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';

import Logo from '../Logo/Logo';
import Space from '../Space/Space';
import classes from './SignUpModal.module.less';

interface SignUpModalProps extends ModalProps,
  RouteComponentProps,
  FormComponentProps {
  handleToggleModal: () => void;
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
    <Modal
      visible={visible}
      onOk={handleToggleModal}
      onCancel={handleToggleModal}
      footer={null}
      width={400}
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
    </Modal>
  );
};

export default withRouter(Form.create<SignUpModalProps>()(SignUpModal));
