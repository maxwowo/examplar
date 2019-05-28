/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Layout, List, Typography, Comment } from "antd";

/* Custom components */
import ExamContentList from "./ExamContentList/ExamContentList";
import ExamContentComment from "./ExamContentComment/ExamContentComment";

/* Styles */
import "./ExamContent.less";

const { Content } = Layout;
const { Item } = List;
const { Paragraph } = Typography;

const ExamContent = props => (
  <Content id="exam-page-content">
    <ExamContentList/>
    <ExamContentComment/>
  </Content>
);

export default ExamContent;
