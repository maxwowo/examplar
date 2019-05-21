/* React */
import React from "react";

/* Ant Design components */
import { Layout, Typography } from "antd";

/* Custom components */
import SearchBox from "../SearchBox/SearchBox";

/* Style */
import "./HomePage.less";

const {Title} = Typography;
const {Content} = Layout;

const HomePage = () => (
  <Content id="home-page-content">
    <Title id="home-page-title" ellipsis className="text">Find your examplar</Title>
    <Title level={4} className="text" id="home-page-subtitle">The best solutions written by your fellow students,
      organized into one
      place.</Title>
    <SearchBox/>
  </Content>
);

export default HomePage;