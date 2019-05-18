/* React */
import React from "react";

/* Ant Design components */
import { Typography } from "antd";

/* Custom components */
import SearchBox from "../SearchBox/SearchBox";

/* Style */
import "./HomePage.less";

const { Title } = Typography;

const HomePage = () => (
  <div>
    <Title id="title-header" className="text">Find your examplar</Title>
    <Title level={4} className="text">The best solutions written by your fellow students, organized into one
      place.</Title>
    <SearchBox/>
  </div>
);

export default HomePage;