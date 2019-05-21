/* React */
import React, { Component } from "react";

/* Axios */
import Axios from "axios";

/* React Router */
import { withRouter } from "react-router-dom";

class SearchPage extends Component {
  state = {};

  componentDidMount() {
    const { location } = this.props;

    const params = new URLSearchParams(location.search);
    const course = params.get("course");
    const university = params.get("university");

    Axios.get("/api/courses", {
      params: {
        course: !course ? "" : course,
        university: !university ? "" : university
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      // console.log(err);
    });
  }

  render() {
    return (
      <div>aoeu</div>
    );
  }
}

export default withRouter(SearchPage);