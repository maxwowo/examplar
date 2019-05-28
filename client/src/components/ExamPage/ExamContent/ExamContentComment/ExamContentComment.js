/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import {Typography, Row, Col, Input, Button } from "antd";

/* Styles */
// import "./ExamContentComment.less";

const {TextArea} = Input;

const ExamContentComment = props => (
  <Row
    style={{marginTop: "10px"}}
    type="flex"
    align="middle"
  >
    <Col span={24}>
      <TextArea
      />
    </Col>
    <Col span={10}>
      <Button
        type="primary"
      >
        Comment
      </Button>
    </Col>
  </Row>
);

export default ExamContentComment;
