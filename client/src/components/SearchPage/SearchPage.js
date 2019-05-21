/* React */
import React, { Component } from "react";

/* Axios */
import Axios from "axios";

/* React Router */
import { withRouter } from "react-router-dom";

class SearchPage extends Component {


  componentDidMount() {
    const { location } = this.props;

    const params = new URLSearchParams(location.search);
  }

  render() {
    return (
      <div>aoeu</div>
    );
  }
}

export default withRouter(SearchPage);