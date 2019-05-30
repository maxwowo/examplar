/* React */
import React from "react";

/* Ant Design components */
import { Button } from "antd";

/* Styles */
import "./MenuButton.less";

const MenuButton = props => (
  <Button
    icon="plus"
    shape="round"
    type="primary"
    id="exam-page-sider-menu-btn"
    className="exam-page-sider-btn"
  />
);

export default MenuButton;
