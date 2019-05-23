/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Typography, Button } from "antd";

/* Custom components */
import CreateCourseModal from "./CreateCourseModal/CreateCourseModal";

const { Paragraph } = Typography;

class NoCourses extends Component {

  state = {
    modalVisible: false
  };

  toggleModal = () => {
    const { modalVisible } = this.state;

    this.setState({ modalVisible: !modalVisible });
  };

  render() {
    return (
      <div>
        <CreateCourseModal
          visible={this.state.modalVisible}
          toggleModal={this.toggleModal}
        />
        <Paragraph>Your search did not match any courses</Paragraph>
        <Button type="primary" onClick={this.toggleModal}>Create course</Button>
      </div>
    );
  }
}

export default NoCourses;