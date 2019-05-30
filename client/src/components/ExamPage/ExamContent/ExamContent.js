/* React */
import React from "react";

/* Ant Design components */
import { Layout } from "antd";

/* Custom components */
import ExamContentList from "./ExamContentList/ExamContentList";
import ExamContentComment from "./ExamContentComment/ExamContentComment";

/* Styles */
import "./ExamContent.less";

const { Content } = Layout;

const ExamContent = () => (
  <Content id="exam-page-content">
    <ExamContentComment/>
    <ExamContentList/>
  </Content>
);

export default ExamContent;
