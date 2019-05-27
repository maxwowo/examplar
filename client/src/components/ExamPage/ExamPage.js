/* React */
import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Row, Col } from "antd";

/* Axios */
import Axios from "axios";

/* Custom components */
import ExamSider from "./ExamSider/ExamSider";

/* Style */
import "./ExamPage.less";

const mapStateToProps = state => (
  {}
);

const mapDispatchToProps = dispatch => (
  {}
);

class ExamPage extends Component {

  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        id="exam-page-container"
      >

        <Col
          span={5}
          id="exam-sider-container"
        >
          <ExamSider/>
        </Col>

        <Col
          offset={1}
          span={10}
          id="exam-content-container"
        >
          <div>hi</div>
        </Col>

      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);
