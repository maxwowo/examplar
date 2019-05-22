/* React */
import React, { Component } from "react";

/* List of all universities */
import universities from "../../constants/universities";
import { Select } from "antd";

/* Maximum number of options in the drop-down menu */
const maxOptionsCount = 4;

/* Get the minimum to avoid stepping out of bounds */
const numOptions = Math.min(maxOptionsCount, universities.length);

const { Option } = Select;

class UniversitySelect extends Component {
  state = {

    /* List of universities to be displayed in the select */
    options: universities.slice(0, numOptions)
  };

  /* Changes the options in the select based on the search string */
  handleSearch = val => {

    /* Initially empty list matched universities */
    const matchedOptions = [];

    /* Find universities that match the search string */
    for (let uni of universities) {
      let matchedOptionsLen = matchedOptions.length;

      if (matchedOptionsLen < numOptions && uni.toLowerCase().indexOf(val.toLowerCase()) >= 0)
        matchedOptions.push(uni);

      if (matchedOptionsLen === numOptions) break;
    }

    /* Update the options */
    this.setState({ options: matchedOptions });
  };

  render() {
    return (
      <Select
        showSearch
        placeholder={this.props.placeholder}
        optionFilterProp="children"
        onSearch={this.handleSearch}
        size={this.props.size}
        id={this.props.id}
        name="university"
        onSelect={this.props.onSelect}
      >
        {this.state.options.map((curr, i) => <Option value={curr} key={i}>{curr}</Option>)}
      </Select>
    );
  }
}

export default UniversitySelect;