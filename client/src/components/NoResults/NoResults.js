/* React */
import React, { Component } from "react";

/* Ant Design */
import { Typography, Button } from "antd";

/* Custom components */
import CreateCourseModal from "./CreateCourseModal/CreateCourseModal";

const { Paragraph } = Typography;

class NoResults extends Component {
  state = {
    visible: false
  };

  toggleModal = () => {
    const { visible } = this.state;

    this.setState({ visible: !visible });
  };

  render() {
    return (
      <div>
        <CreateCourseModal visible={this.state.visible} toggleModal={this.toggleModal}/>
        <Paragraph>Your search did not match any courses</Paragraph>
        <Button type="primary" shape="round" onClick={this.toggleModal}>Create course</Button>
      </div>
    );
  }
}

export default NoResults;