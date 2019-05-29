/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Layout } from "antd";

/* Custom components */
import ExamContentList from "./ExamContentList/ExamContentList";
import ExamContentComment from "./ExamContentComment/ExamContentComment";

/* Styles */
import "./ExamContent.less";

const { Content } = Layout;

const ExamContent = props => (
  <Content id="exam-page-content">
    <ExamContentComment/>
    <ExamContentList/>
  </Content>
);

export default ExamContent;
