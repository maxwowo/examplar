/* React */
import React from "react";

/* React Router */
import { Link } from "react-router-dom";

/* Ant Design components */
import { Col, Icon, Layout, Row } from "antd";

/* Logo */
import logo from "../../assets/logo.png";

const { Header } = Layout;

const Navbar = () => (
  <Layout>
    <Header id="navbar">
      <Row type="flex" align="middle" justify="center">

        <Col span={5}>
          <Link to="/">
            <img id="logo" src={logo} alt="logo"/>
          </Link>
        </Col>

        <Col span={5} offset={6}>
          <Icon className="icon" type="github" onClick={() => {
            window.open("https://github.com/maxwowo/examplar", "_blank");
          }}/>
        </Col>

      </Row>
    </Header>
  </Layout>
);

export default Navbar;