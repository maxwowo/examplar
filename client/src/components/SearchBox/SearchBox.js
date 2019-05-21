/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Button, Input, Select } from "antd";

/* List of all universities */
import universities from "../../constants/universities";

/* Style */
import "./SearchBox.less";

const { Group } = Input;
const { Option } = Select;

const maxOptionsCount = 4;
const numOptions = Math.min(maxOptionsCount, universities.length);

class SearchBox extends Component {
  state = {

    /* List of universities to be displayed in the select */
    options: universities.slice(0, numOptions),

    course: "",

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
    console.log(this.state.course, this.state.university);
    e.preventDefault();
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
            value={this.state.course}
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
            value={this.state.university}
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

export default SearchBox;