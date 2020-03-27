import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Layout, Row } from 'antd';

import AuthModal from '../AuthModal/AuthModal';
import Logo from '../Logo/Logo';
import classes from './Navbar.module.less';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {

  const [
    loginOpen,
    setLoginOpen
  ] = React.useState(false);

  const [
    signUpOpen,
    setSignUpOpen
  ] = React.useState(false);

  const toggleLoginModal = () => {
    setLoginOpen(!loginOpen);
  };

  const toggleSignUpModal = () => {
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
          <AuthModal
            visible={loginOpen}
            isLogin={true}
            handleToggleModal={toggleLoginModal}
          />
          <Button
            type='link'
            onClick={toggleLoginModal}
            className={classes.loginButton}
          >
            Login
          </Button>

          <AuthModal
            visible={signUpOpen}
            isLogin={false}
            handleToggleModal={toggleSignUpModal}
          />
          <Button
            ghost
            type='primary'
            onClick={toggleSignUpModal}
          >
            Sign up
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
