/* React */
import React from "react";

/* Ant Design components */
import { Layout, Typography, Card, Button } from "antd";

/* Styles */
import "./CourseSider.less";

const { Sider } = Layout;
const { Paragraph } = Typography;

const CourseSider = props => (
  <Sider
    id="course-page-sider"
    width="100%"
  >
    <Card
      title={props.courseName}
      bordered={false}
      id="course-page-card"
    >
      <Paragraph>
        {props.courseCode} @ {props.universityName}
      </Paragraph>

      <Button type="primary">Add exam</Button>
    </Card>
  </Sider>
);

export default CourseSider;