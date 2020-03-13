import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Layout, Row } from 'antd';

import Logo from '../Logo/Logo';
import { notifyNotImplemented } from '../../tools/errorNotifier';
import classes from './Navbar.module.less';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => (
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
          <Button
            ghost
            type='primary'
            onClick={notifyNotImplemented}
          >
            Sign up
          </Button>
        </Col>
      </Row>
  </Layout.Header>
);

export default Navbar;
