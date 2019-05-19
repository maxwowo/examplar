/* React */
import React from "react";

/* Ant Design components */
import { Button, Input, Select } from "antd";

/* Style */
import "./SearchBox.less";

const { Group } = Input;
const { Option } = Select;

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
  <Group compact id="search-box-group">
    <Input id="search-box-input" size="large" placeholder="Search for courses"/>

    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Filter by university"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      size="large"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>

    <Button type="primary" icon="search" size="large">Search</Button>
  </Group>
);

export default SearchBox;