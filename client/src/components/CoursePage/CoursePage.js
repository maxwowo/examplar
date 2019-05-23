/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Layout, Row, Col } from "antd";

/* Custom components */
import CourseSider from "./CourseSider/CourseSider";

/* Axios */
import Axios from "axios";

/* Styles */
import "./CoursePage.less";

const { Content } = Layout;

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
          <Content id="course-page-list">Content</Content>
        </Col>
      </Row>
    );
  }
}

export default CoursePage;