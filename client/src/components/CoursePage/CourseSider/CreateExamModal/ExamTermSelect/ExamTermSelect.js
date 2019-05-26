/* React */
import React from "react";

/* Utility functions */
import { getExamTerms } from "../util";
import { Select } from "antd";

const { Option } = Select;

const ExamTermSelect = props => (
  <Select
    {...props}
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

export default ExamTermSelect;
