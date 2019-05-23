/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Row, Col } from "antd";

/* Axios */
import Axios from "axios";

/* Custom components */
import CourseSider from "./CourseSider/CourseSider";
import CourseContent from "./CourseContent/CourseContent";

/* Styles */
import "./CoursePage.less";

class CoursePage extends Component {
  state = {
    courseName: null,
    courseCode: null,
    universityName: null,
    exams: []
  };

  componentDidMount() {
    const courseId = this.props.match.params.id;

    Axios.get(`/api/courses/${courseId}`).then(res => {
      const { data } = res;
      this.setState({ ...data });
    });
  }

  render() {

    const courseId = this.props.match.params.id;

    return (
      <Row
        id="course-page-content"
        className="container-width"
      >

        <Col span={10}>
          <CourseSider
            courseName={this.state.courseName}
            courseCode={this.state.courseCode}
            universityName={this.state.universityName}
          />
        </Col>

        <Col offset={1} span={13}>
          <CourseContent
            exams={this.state.exams}
            courseId={courseId}
          />
        </Col>
      </Row>
    );
  }
}

export default CoursePage;