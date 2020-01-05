import React from 'react';
import { Col, Icon, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/logo.png';

interface NavbarProps {

}

const StyledNavbar = styled.div`
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0;
`;

const {Header} = Layout;

const Navbar: React.FC<NavbarProps> = () => (
  <StyledNavbar>
    <Header id="navbar">
      <Row
        type="flex"
        align="middle"
        justify="space-between"
      >
        <Col>
          <Link to="/">
            <img id="logo" src={logo} alt="logo"/>
          </Link>
        </Col>

        <Col>
          <Icon type="github" onClick={() => {
            window.open('https://github.com/maxwowo/examplar', '_blank');
          }}/>
        </Col>
      </Row>
    </Header>
  </StyledNavbar>
);

export default Navbar;
