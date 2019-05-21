/* React */
import React, { Component } from "react";

/* React Router */
import { withRouter } from "react-router-dom";

/* Query string API */
import qs from "querystring";

class SearchPage extends Component {
  componentDidMount() {
    // const params = qs.parse(this.props.location.search);
    const params = new URLSearchParams(this.props.location.search);
    console.log(params);
  }

  render() {
    return (
      <div>aoeu</div>
    )
  }
}

export default withRouter(SearchPage);