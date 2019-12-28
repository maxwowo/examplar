/* React */
import React, { Component } from "react";

/* Utility functions */
import { getExamTerms } from "../util";
import { Select } from "antd";

const { Option } = Select;

class ExamTermSelect extends Component {
  render() {
    return (
      <Select
        {...this.props}
        placeholder="Select an exam term"
        name="examTerm"
      >
        {getExamTerms().map(
          (curr, i) => <Option value={curr} key={i}>
            {curr}
          </Option>
        )}
      </Select>
    );
  }
}

export default ExamTermSelect;
