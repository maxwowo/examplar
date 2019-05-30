/* React */
import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Row, Col } from "antd";

/* Axios */
import Axios from "axios";

/* Constants */
import {
  SET_EXAM_QUESTIONS
} from "../../constants/actions";

/* Custom components */
import ExamSider from "./ExamSider/ExamSider";
import ExamContent from "./ExamContent/ExamContent";

/* Style */
import "./ExamPage.less";

const mapDispatchToProps = dispatch => (
  {
    handleSetQuestions: questions => dispatch(
      {
        questions: questions,
        type: SET_EXAM_QUESTIONS
      }
    )

  }
);

class ExamPage extends Component {

  componentDidMount() {

    const examId = this.props.match.params.examId;

    Axios.get(
      `/api/exams/${examId}`
    ).then(
      res => {
        console.log(res.data);
        this.props.handleSetQuestions(res.data);
      }
    );
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

export default connect(null, mapDispatchToProps)(ExamPage);
