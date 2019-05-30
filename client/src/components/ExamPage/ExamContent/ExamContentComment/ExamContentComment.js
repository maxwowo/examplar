/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Typography, Row, Col, Input, Button, Switch } from "antd";

/* Styles */
import "./ExamContentComment.less";

const { TextArea } = Input;
const { Text } = Typography;

const ExamContentComment = props => (
  <div>
    <Row
      id="exam-content-comment-container"
      type="flex"
      align="middle"
    >
      <Col span={24}>
        <TextArea
          autosize={{ minRows: 8 }}
          id="exam-content-comment-textarea"
        />
      </Col>
    </Row>

    <Row
      type="flex"
      justify="space-between"
      align="middle"
    >
      <Col>
        <Button
          type="primary"
        >
          Comment
        </Button>
      </Col>

      <Col>
        <Text
          id="exam-content-comment-preview"
        >
          Preview
        </Text>
        <Switch/>
      </Col>
    </Row>
  </div>
);

export default ExamContentComment;
