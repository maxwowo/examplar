/* React */
import React from "react";

/* Ant Design components */
import { Button, Input, Select } from "antd";

/* Style */
import "./SearchBox.less";

const {Group} = Input;
const {Option} = Select;

const onChange = value => {
  console.log(`selected ${value}`);
};

const onBlur = () => {
  console.log("blur");
};

const onFocus = () => {
  console.log("focus");
};

const onSearch = val => {
  console.log("search:", val);
};

const SearchBox = () => (
  <Group compact>
    <Input id="search-box-input" size="large" placeholder="Search for courses"/>

    <Select
      showSearch
      placeholder="Filter by university"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      size="large"
      id="search-box-select"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>

    <Button type="primary" id="search-box-btn" icon="search"
            size="large">Search</Button>
  </Group>
);

export default SearchBox;