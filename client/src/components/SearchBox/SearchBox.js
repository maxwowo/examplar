/* React */
import React from "react";

/* Ant Design components */
import { Input } from "antd";

const { Search } = Input;

const SearchBox = () => (
  <Search
    placeholder="Search for courses"
    enterButton="Search"
    size="large"
    onSearch={value => console.log(value)}
  />
);

export default SearchBox;