import React from 'react';
import { Col, Icon, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.less';
import logo from '../../assets/logo.png';

interface NavbarProps {

}

const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = () => (
  <Header
    className={styles.navbar}
  >
    <Row
      type="flex"
      align="middle"
      justify="space-between"
    >
      <Col>
        <Link to="/">
          <img
            className={styles.logo}
            src={logo}
            alt="logo"
          />
        </Link>
      </Col>

      <Col>
        <Icon
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
