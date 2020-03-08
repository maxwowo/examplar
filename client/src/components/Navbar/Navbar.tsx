import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Icon, Layout, Row } from 'antd';

import Logo from '../Logo/Logo';
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
          <Icon
            className={classes.icon}
            type="github"
            onClick={() => {
              window.open('https://github.com/maxwowo/examplar', '_blank');
            }}
          />
        </Col>
      </Row>
  </Layout.Header>
);

export default Navbar;
