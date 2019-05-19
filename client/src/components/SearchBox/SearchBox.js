/* React */
import React from "react";

/* Ant Design components */
import { Col, Input, Row, Select } from "antd";

const { Search, Group } = Input;
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
  <Group size="large">
    <Row>

      <Col span={15}>
        <Search
          placeholder="Search for courses"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
      </Col>

      <Col span={9}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
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
      </Col>

    </Row>
  </Group>
);

export default SearchBox;