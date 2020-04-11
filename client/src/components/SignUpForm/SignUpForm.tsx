import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import classes from '../AuthModal/AuthModal.module.less';
import { FormComponentProps } from 'antd/lib/form';
import crypto from 'crypto';

import Space from '../Space/Space';
import { notifyError } from '../../tools/errorNotifier';
import userModel from '../../models/user';

interface SignUpFormProps extends FormComponentProps {
  toggleIsLogin: () => void;
  handleToggleModal?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (
  {
    form,
    toggleIsLogin,
    handleToggleModal
  }
) => {
  const FORM_ID = 'sign-up-modal-form';

  const [
    loading,
    setLoading
  ] = React.useState(false);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    form.validateFields(
      (
        err,
        {
          username,
          email,
          password
        }
      ) => {
        if (!err) {
          setLoading(true);

          const hash = crypto.createHash('sha256');

          hash.write(password);

          userModel.create(
            username,
            email,
            hash.digest('base64')
          )
            .then(res => {
              setLoading(false);
              if (handleToggleModal !== undefined) {
                handleToggleModal();
              }
              console.log(res);
            })
            .catch(err => {
              setLoading(false);
              notifyError(
                err,
                'Registration failed.',
                'Could not create user.'
              );
            });
        }
      }
    );
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
                      callback('Passwords do not match.');
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
            className={classes.submitButton}
            loading={loading}
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
