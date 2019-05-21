/* React */
import React, { Component } from "react";

/* Ant Design components */
import { Button, Input, Select } from "antd";

/* Universities */
import universities from "../../constants/universities";

/* Style */
import "./SearchBox.less";

const { Group } = Input;
const { Option } = Select;

const maxOptionsCount = 4;
const numOptions = Math.min(maxOptionsCount, universities.length);

class SearchBox extends Component {
  state = {
    options: universities.slice(0, numOptions)
  };

  handleSearch = val => {
    const matchedOptions = [];

    for (let uni of universities)
      if (matchedOptions.length < numOptions && uni.toLowerCase().indexOf(val.toLowerCase()) >= 0)
        matchedOptions.push(uni);

    this.setState({ options: matchedOptions });
  };

  render() {
    return (
      <Group compact>
        <Input id="search-box-input" size="large" placeholder="Search for courses"/>

        <Select
          showSearch
          placeholder="Filter by university"
          optionFilterProp="children"
          onSearch={this.handleSearch}
          size="large"
          id="search-box-select"
        >
          {this.state.options.map((curr, i) => <Option value={curr} key={i}>{curr}</Option>)}
        </Select>

        <Button type="primary" id="search-box-btn" icon="search"
                size="large">Search</Button>
      </Group>
    )
  }
}

export default SearchBox;