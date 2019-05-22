/* React */
import React, { Component } from "react";

/* Axios */
import Axios from "axios";

class CoursePage extends Component {
  state = {
    courseName: null,
    courseCode: null
  };

  componentDidMount() {
    const courseId = this.props.match.params.id;

    Axios.get(`/api/courses/${courseId}`).then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div>course page</div>
    );
  }
}

export default CoursePage;