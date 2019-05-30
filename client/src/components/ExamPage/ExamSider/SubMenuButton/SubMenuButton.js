/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Button, Input, Form } from "antd";

/* Style */
import "./SubMenuButton.less";

const { Group } = Input;

class SubMenuButton extends Component {
  state = {
    showButton: true
  };

  toggleShowButton = () => this.setState(
    {
      showButton: !this.state.showButton
    }
  );

  handleSubmit = e => {
    console.log(e.target.value);
    this.toggleShowButton();
  };

  render() {

    const button = (
      <Button
        icon="plus"
        shape="circle"
        className="exam-page-sider-btn"
        onClick={this.toggleShowButton}
      />
    );

    const input = (
      <div id="exam-sider-sub-menu-group">
        <Group compact>
          <Input
            size="small"
            autoFocus
            id="exam-sider-sub-menu-input"
            name="subQuestion"
            onKeyPress={e => {
              if (e.key === "Enter") this.handleSubmit(e);
            }}
          />
          <Button
            onClick={this.toggleShowButton}
            htmlType="submit"
            icon="close"
            size="small"
            id="exam-sider-sub-menu-cancel-btn"
          />
        </Group>
      </div>
    );

    return (this.state.showButton ? button : input);
  }
}


export default SubMenuButton;
