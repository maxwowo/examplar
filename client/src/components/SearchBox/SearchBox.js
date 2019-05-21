/* React */
import React, { Component } from "react";

/* React Router */
import { withRouter } from "react-router-dom";

/* Ant Design components */
import { Button, Input, Select } from "antd";

/* List of all universities */
import universities from "../../constants/universities";

/* Style */
import "./SearchBox.less";

const { Group } = Input;
const { Option } = Select;

/* Maximum number of options in the drop-down menu */
const maxOptionsCount = 4;

/* Get the minimum to avoid stepping out of bounds */
const numOptions = Math.min(maxOptionsCount, universities.length);

class SearchBox extends Component {
  state = {

    /* List of universities to be displayed in the select */
    options: universities.slice(0, numOptions),

    /* Course entered by the user */
    course: "",

    /* University selected by the user */
    university: ""
  };

  /* Changes the options in the select based on the search string */
  handleSearch = val => {

    /* Initially empty list matched universities */
    const matchedOptions = [];

    /* Find universities that match the search string */
    for (let uni of universities)
      if (matchedOptions.length < numOptions && uni.toLowerCase().indexOf(val.toLowerCase()) >= 0)
        matchedOptions.push(uni);

    /* Update the options */
    this.setState({ options: matchedOptions });
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

    const params = new URLSearchParams({course: course, university: university});

    history.push({
      pathname: "/courses",
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

          <Select
            showSearch
            placeholder="Filter by university"
            optionFilterProp="children"
            onSearch={this.handleSearch}
            size="large"
            id="search-box-select"
            name="university"
            onSelect={this.handleUniversitySelect}
          >
            {this.state.options.map((curr, i) => <Option value={curr} key={i}>{curr}</Option>)}
          </Select>

          <Button
            type="primary"
            htmlType="submit"
            id="search-box-btn"
            icon="search"
            size="large"
          />
        </Group>
      </form>
    )
  }
}

export default withRouter(SearchBox);