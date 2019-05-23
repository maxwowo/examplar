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
    exams: null
  };

  componentDidMount() {
    const courseId = this.props.match.params.id;

    Axios.get(`/api/courses/${courseId}`).then(res => {
      const { data } = res;
      this.setState({ ...data });
    });
  }

  render() {
    console.log(this.state);
    return (
      <Row id="course-page-content" className="container-width">

        <Col span={10}>
          <CourseSider {...this.state}/>
        </Col>

        <Col offset={4} span={10}>
          <CourseContent/>
        </Col>
      </Row>
    );
  }
}

export default CoursePage;