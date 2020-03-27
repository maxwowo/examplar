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
    isLogin,
    setIsLogin
  ] = React.useState<boolean>(false);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const [
    authOpen,
    setAuthOpen
  ] = React.useState(false);

  const toggleAuthModal = () => {
    setAuthOpen(!authOpen);
  };

  const handleLoginClicked = () => {
    setIsLogin(true);
    toggleAuthModal();
  };

  const handleSignUpClicked = () => {
    setIsLogin(false);
    toggleAuthModal();
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
            onClick={handleLoginClicked}
            className={classes.loginButton}
          >
            Login
          </Button>

          <AuthModal
            visible={authOpen}
            isLogin={isLogin}
            handleToggleModal={toggleAuthModal}
            toggleIsLogin={toggleIsLogin}
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
