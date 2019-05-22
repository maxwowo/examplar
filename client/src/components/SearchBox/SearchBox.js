/* React */
import React, { Component } from "react";

/* React Router */
import { withRouter } from "react-router-dom";

/* Ant Design components */
import { Button, Input, Select } from "antd";

/* Custom components */
import UniversitySelect from "../UniversitySelect/UniversitySelect";

/* Style */
import "./SearchBox.less";

const { Group } = Input;

class SearchBox extends Component {
  state = {

    /* Course entered by the user */
    course: "",

    /* University selected by the user */
    university: ""
  };

  handleCourseChange = e => {
    this.setState({ course: e.target.value });
  };

  handleUniversitySelect = e => {
    this.setState({ university: e });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { course, university } = this.state;
    const { history } = this.props;

    const params = new URLSearchParams({ course: course, university: university });

    history.push({
      pathname: "/search",
      search: params.toString()
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Group compact>
          <Input
            id="search-box-input"
            size="large"
            placeholder="Search for courses"
            name="course"
            onChange={this.handleCourseChange}
          />

          <UniversitySelect
            onSelect={this.handleUniversitySelect}
            placeholder="Filter by university"
            size="large"
          />

          <Button
            type="primary"
            htmlType="submit"
            id="search-box-btn"
            icon="search"
            size="large"
          />
        </Group>
      </form>
    );
  }
}

export default withRouter(SearchBox);