import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Layout, Row } from 'antd';

import SignUpModal from '../SignUpModal/SignUpModal';
import Logo from '../Logo/Logo';
import { notifyNotImplemented } from '../../tools/errorNotifier';
import classes from './Navbar.module.less';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {

  const [
    signUpOpen,
    setSignUpOpen
  ] = React.useState(false);

  const [
    loginOpen,
    setLoginOpen
  ] = React.useState(false);

  const handleSignUpClicked = () => {
    setSignUpOpen(!signUpOpen);
  };

  return (
    <Layout.Header
      className={classes.navbar}
    >
      <Row
        type="flex"
        align="middle"
        justify="space-between"
        className={classes.navbarBody}
      >
        <Col>
          <Link
            to="/"
          >
            <Logo
              className={classes.logo}
            />
          </Link>
        </Col>

        <Col>
          <Button
            type='link'
            onClick={notifyNotImplemented}
            className={classes.loginButton}
          >
            Login
          </Button>

          <SignUpModal
            visible={signUpOpen}
            handleToggleModal={handleSignUpClicked}
          />
          <Button
            ghost
            type='primary'
            onClick={handleSignUpClicked}
          >
            Sign up
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
