/* React */
import React, { Component } from "react";

/* Axios */
import Axios from "axios";

class CoursePage extends Component {
  componentDidMount() {
    const courseId = this.props.match.params.id;


  }

  render() {
    return (
      <div>course page</div>
    );
  }
}

export default CoursePage;