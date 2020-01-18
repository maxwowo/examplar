import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Icon, Layout, Row } from 'antd';

import logo from '../../assets/logo.png';
import classes from './Navbar.module.less';

const { Header } = Layout;

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => (
  <Header
    className={classes.navbar}
  >
    <Row
      type="flex"
      align="middle"
      justify="space-between"
      className="container-width"
    >

      <Col>
        <Link
          to="/"
        >
          <img
            className={classes.logo}
            src={logo}
            alt="logo"
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
  </Header>
);

export default Navbar;
