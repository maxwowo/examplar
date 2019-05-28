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
import ExamContent from "./ExamContent/ExamContent";

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
          xs={8}
          md={6}
          id="exam-page-sider-container"
        >
          <ExamSider/>
        </Col>

        <Col
          xs={16}
          md={18}
          id="exam-page-content-container"
        >
          <ExamContent/>
        </Col>

      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);
