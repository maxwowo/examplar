import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import classes from '../AuthModal/AuthModal.module.less';
import { FormComponentProps } from 'antd/lib/form';

import { notifyNotImplemented } from '../../tools/errorNotifier';

interface LoginFormProps extends FormComponentProps {
  toggleIsLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (
  {
    form,
    toggleIsLogin
  }
) => {
  const FORM_ID = 'login-modal-form';

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
        <Form.Item>
          {form.getFieldDecorator(
            'usernameEmail',
            {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please enter your username or E-mail.'
                }
              ]
            }
          )(
            <Input
              placeholder='Username or E-mail'
            />
          )}
        </Form.Item>

        <Form.Item>
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

        <Form.Item>
          <Button
            type='primary'
            key='submit'
            form={FORM_ID}
            htmlType='submit'
            onClick={notifyNotImplemented}
            className={classes.submitButton}
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <Row
        type='flex'
        justify='space-between'
      >
        <Col>
          <span
            onClick={notifyNotImplemented}
            className={classes.spanLink}
          >
            Forgot password?
          </span>
        </Col>

        <Col>
          <span
            onClick={toggleIsLogin}
            className={classes.spanLink}
          >
            Sign Up
          </span>
        </Col>
      </Row>

    </React.Fragment>
  );
};

export default Form.create<LoginFormProps>()(LoginForm);
