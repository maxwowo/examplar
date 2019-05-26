/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Layout, Typography, Card, Button } from "antd";

/* Custom components */
import CreateExamModal from "./CreateExamModal/CreateExamModal";

/* Styles */
import "./CourseSider.less";

const mapStateToProps = state => (
  {
    courseName: state.course.courseName,
    courseCode: state.course.courseCode,
    universityName: state.course.universityName
  }
);

const { Sider } = Layout;
const { Paragraph } = Typography;

const CourseSider = (
  {
    courseName,
    courseCode,
    universityName,
    handleModalToggle
  }
) => (
  <Sider
    id="course-page-sider"
    width="100%"
  >
    <CreateExamModal
      handleModalToggle={handleModalToggle}
    />
    <Card
      title={courseName}
      bordered={false}
      id="course-page-card"
    >
      <Paragraph>
        {courseCode} @ {universityName}
      </Paragraph>

      <Button
        type="primary"
        onClick={handleModalToggle}
      >
        Add exam
      </Button>
    </Card>
  </Sider>
);

export default connect(mapStateToProps)(CourseSider);
