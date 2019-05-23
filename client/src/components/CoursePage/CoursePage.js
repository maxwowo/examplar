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
    exams: [],
    courseId: this.props.match.params.id
  };

  componentDidMount() {

    /* Get information about the course */
    Axios.get(`/api/courses/${this.state.courseId}`).then(res => {

      /* Get the response data */
      const { data } = res;

      /* Update the states using the data */
      this.setState({ ...data });
    });
  }

  render() {

    return (
      <div
        id="course-page-container"
        className="container-width"
      >
        <Row
          type="flex"
          justify="space-between"
        >

          <Col xs={24} md={10}>
            <CourseSider
              courseName={this.state.courseName}
              courseCode={this.state.courseCode}
              universityName={this.state.universityName}
            />
          </Col>

          <Col xs={24} md={13}>
            <CourseContent
              exams={this.state.exams}
              courseId={this.state.courseId}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CoursePage;