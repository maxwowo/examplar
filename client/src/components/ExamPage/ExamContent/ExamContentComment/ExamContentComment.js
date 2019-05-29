/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Typography, Row, Col, Input, Button } from "antd";

/* Styles */
import "./ExamContentComment.less";

const { TextArea } = Input;

const ExamContentComment = props => (
  <Row
    id="exam-content-comment-container"
    type="flex"
    align="middle"
  >
    <Col span={24}>
      <TextArea
        autosize={{minRows: 8}}
        id="exam-content-comment-textarea"
      />
    </Col>
    <Col span={24}>
      <Button
        type="primary"
        id="exam-content-comment-comment-btn"
      >
        Comment
      </Button>

      <Button
        type="secondary"
      >
        Preview
      </Button>
    </Col>
  </Row>
);

export default ExamContentComment;
