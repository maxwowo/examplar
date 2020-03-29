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
        <Form.Item
          hasFeedback
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
            />
          )}
        </Form.Item>

        <Form.Item
          hasFeedback
        >
          {form.getFieldDecorator(
            'email',
            {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please enter your email.'
                },
                {
                  type: 'email',
                  message: 'E-mail not valid.'
                }
              ]
            }
          )(
            <Input
              placeholder='E-mail address'
            />
          )}
        </Form.Item>

        <Form.Item
          hasFeedback
        >
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
            />
          )}
        </Form.Item>

        <Form.Item
          hasFeedback
        >
          {form.getFieldDecorator(
            'passwordConfirm',
            {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please confirm your password.'
                },
                {
                  validator: (
                    rule,
                    value,
                    callback
                  ) => {
                    if (value && value !== form.getFieldValue('password')) {
                      callback('Inconsistent passwords.');
                    }
                    callback();
                  }
                }
              ]
            }
          )(
            <Input.Password
              placeholder='Confirm password'
            />
          )}
        </Form.Item>

        <Form.Item>
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
        </Form.Item>
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
