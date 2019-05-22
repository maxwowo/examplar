/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Layout } from "antd";

/* Axios */
import Axios from "axios";

/* Styles */
import "./CoursePage.less";

const { Sider, Content } = Layout;

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
      this.setState({ ...res });
    });
  }

  render() {
    return (
      <div id="course-page-content" className="content-body">
        <Sider id="course-page-sider">Sider</Sider>
        <Content id="course-page-content">Content</Content>
      </div>
    );
  }
}

export default CoursePage;