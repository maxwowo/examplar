import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import classes from '../AuthModal/AuthModal.module.less';
import { FormComponentProps } from 'antd/lib/form';

import Space from '../Space/Space';
import { notifyNotImplemented } from '../../tools/errorNotifier';

interface SignUpFormProps extends FormComponentProps {
  toggleIsLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (
  {
    form,
    toggleIsLogin
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
    <React.Fragment>
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
            className={classes.formInput}
          />
        )}

        {form.getFieldDecorator(
          'email',
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please enter your email.'
              }
            ]
          }
        )(
          <Input
            placeholder='Email address'
            type='email'
            className={classes.formInput}
          />
        )}

        {form.getFieldDecorator(
          'password',
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please enter your password.'
              }
            ]
          }
        )(
          <Input.Password
            placeholder='Password'
            className={classes.formInput}
          />
        )}

        {form.getFieldDecorator(
          'passwordConfirm',
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please confirm your password.'
              }
            ]
          }
        )(
          <Input.Password
            placeholder='Confirm password'
            className={classes.formInput}
          />
        )}

        <Button
          type='primary'
          key='submit'
          form={FORM_ID}
          htmlType='submit'
          onClick={notifyNotImplemented}
          className={classes.submitButton}
        >
          Sign Up
        </Button>
      </Form>
      <div
        className={classes.switchModal}
      >
        <Typography.Text>
          Have an account?
        </Typography.Text>
        <Space/>
        <span
          onClick={toggleIsLogin}
          className={classes.spanLink}
        >
          Login
        </span>
      </div>
    </React.Fragment>
  );
};

export default Form.create<SignUpFormProps>()(SignUpForm);
