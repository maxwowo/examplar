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

  componentDidMount() {

    const examId = this.props.match.params.examId;

    Axios.get(
      `/api/exams/${examId}`
    ).then(
      res => {
        console.log(res.data)
      }
    )
  }

  render() {
    return (
      <Row
        type="flex"
        justify="space-between"
        id="exam-page-container"
      >

        <Col
          xs={8}
          md={6}
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
