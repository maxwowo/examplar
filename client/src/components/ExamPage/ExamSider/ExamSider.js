/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Button, Menu, Icon } from "antd";

/* Styles */
import "./ExamSider.less";

const { SubMenu } = Menu;

const mapStateToProps = state => (
  {}
);

const ExamSider = (
  {}
) => (
  <div
    id="exam-page-sider"
  >
    <Menu
      mode="inline"
      id="exam-page-sider-menu"
    >
      <SubMenu
        key="sub1"
        title={<span>Question One</span>}
      >
        <Menu.Item key="1">1i)</Menu.Item>
        <Menu.Item key="2">2i)</Menu.Item>
        <Menu.Item key="3">2ii)</Menu.Item>
        <Menu.Item key="4">2iii)</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={<span>Question Two</span>}
      >
        <Menu.Item key="5">1i)</Menu.Item>
        <Menu.Item key="6">2i)</Menu.Item>
        <Menu.Item key="7">2ii)</Menu.Item>
        <Menu.Item key="8">2iii)</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub3"
        title={<span>Question Three</span>}
      >
        <Menu.Item key="9">1i)</Menu.Item>
        <Menu.Item key="10">2i)</Menu.Item>
        <Menu.Item key="11">2ii)</Menu.Item>
        <Menu.Item key="12">2iii)</Menu.Item>
      </SubMenu>
    </Menu>
    <Button
      type="primary"
      shape="round"
      id="exam-page-sider-add-big-question-btn"
    >
      <Icon type="plus"/>
    </Button>
  </div>
);

export default connect(mapStateToProps)(ExamSider);