/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Layout, Typography, Card, Button } from "antd";

/* Custom components */
import CreateExamModal from "./CreateExamModal/CreateExamModal";

/* Styles */
import "./CourseSider.less";

const { Sider } = Layout;
const { Paragraph } = Typography;

class CourseSider extends Component {

  state = {
    modalVisible: false
  };

  toggleModal = () => {
    const { modalVisible } = this.state;

    this.setState({ modalVisible: !modalVisible });
  };

  render() {
    return (
      <Sider
        id="course-page-sider"
        width="100%"
      >
        <CreateExamModal
          toggleModal={this.toggleModal}
          visible={this.state.modalVisible}
          courseId={this.props.courseId}
          handleAddExam={this.props.handleAddExam}
        />
        <Card
          title={this.props.courseName}
          bordered={false}
          id="course-page-card"
        >
          <Paragraph>
            {this.props.courseCode} @ {this.props.universityName}
          </Paragraph>

          <Button
            type="primary"
            onClick={this.toggleModal}
          >
            Add exam
          </Button>
        </Card>
      </Sider>
    );
  }
}

export default CourseSider;