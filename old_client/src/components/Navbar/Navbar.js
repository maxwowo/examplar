/* React */
import React from "react";

/* React Router */
import { Link } from "react-router-dom";

/* Ant Design components */
import { Col, Icon, Layout, Row } from "antd";

/* Logo */
import logo from "../../assets/logo.png";

/* Styles */
import "./Navbar.less";
import "../../custom.less";

const { Header } = Layout;

const Navbar = () => (
  <Header id="navbar">
      <Row
        type="flex"
        align="middle"
        justify="space-between"
        className="container-width"
      >

        <Col>
          <Link to="/">
            <img id="logo" src={logo} alt="logo"/>
          </Link>
        </Col>

        <Col>
          <Icon className="icon" type="github" onClick={() => {
            window.open("https://github.com/maxwowo/examplar", "_blank");
          }}/>
        </Col>

      </Row>
  </Header>
);

export default Navbar;