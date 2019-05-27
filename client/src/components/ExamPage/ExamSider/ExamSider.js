/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Layout, Typography, Card, Button } from "antd";

/* Styles */
import "./ExamSider.less";

const { Sider } = Layout;
const { Paragraph } = Typography;

const mapStateToProps = state => (
  {
  }
);

const ExamSider = (
  {

  }
) => (
  <Sider
    id="exam-page-sider"
    width="100%"
  >
    <Paragraph>aoeu</Paragraph>
  </Sider>
);

export default connect(mapStateToProps)(ExamSider);
