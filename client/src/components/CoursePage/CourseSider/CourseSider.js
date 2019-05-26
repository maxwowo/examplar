/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Constants */
import { CHANGE_EXAM_MODAL_VISIBILITY } from "../../../constants/actions";

/* Ant Design components */
import { Layout, Typography, Card, Button } from "antd";

/* Custom components */
import CreateExamModal from "./CreateExamModal/CreateExamModal";

/* Styles */
import "./CourseSider.less";

const mapStateToProps = state => ({
  courseName: state.course.courseName,
  courseCode: state.course.courseCode,
  universityName: state.course.universityName
});

const mapDispatchToProps = dispatch => ({
  handleModalToggle: e =>
    dispatch({ type: CHANGE_EXAM_MODAL_VISIBILITY })
});

const { Sider } = Layout;
const { Paragraph } = Typography;

const CourseSider = props => (
  <Sider
    id="course-page-sider"
    width="100%"
  >
    <CreateExamModal/>
    <Card
      title={props.courseName}
      bordered={false}
      id="course-page-card"
    >
      <Paragraph>
        {props.courseCode} @ {props.universityName}
      </Paragraph>

      <Button
        type="primary"
        onClick={props.handleModalToggle}
      >
        Add exam
      </Button>
    </Card>
  </Sider>
);

export default connect(mapStateToProps, mapDispatchToProps)(CourseSider);
