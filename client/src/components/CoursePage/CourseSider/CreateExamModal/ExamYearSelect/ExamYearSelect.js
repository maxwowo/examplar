/* React */
import React, { Component } from "react";

/* Utility functions */
import { getExamYears } from "../util";
import { Select } from "antd";

/* Maximum number of options in the drop-down menu */
const numOptions = 4;

const { Option } = Select;

class ExamYearSelect extends Component {

  state = {

    /* List of universities to be displayed in the select */
    options: getExamYears().slice(0, numOptions)
  };

  /* Changes the options in the select based on the search string */
  handleSearch = val => {

    /* Initially empty list matched universities */
    const matchedOptions = [];

    /* Find universities that match the search string */
    for (let year of getExamYears()) {
      let matchedOptionsLen = matchedOptions.length;

      if (matchedOptionsLen < numOptions && year.toLowerCase().indexOf(val.toLowerCase()) >= 0)
        matchedOptions.push(year);

      if (matchedOptionsLen === numOptions) break;
    }

    /* Update the options */
    this.setState(
      {
        options: matchedOptions
      }
    );
  };

  render() {
    return (
      <Select
        showSearch
        {...this.props}
        optionFilterProp="children"
        placeholder="Select an exam year"
        onSearch={this.handleSearch}
        name="examYear"
      >
        {this.state.options.map((curr, i) => <Option value={curr} key={i}>{curr}</Option>)}
      </Select>
    );
  }
}

export default ExamYearSelect;