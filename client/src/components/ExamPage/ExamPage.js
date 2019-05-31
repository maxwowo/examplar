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
  SET_EXAM_QUESTIONS,
  CHANGE_SOLUTIONS,
  CHANGE_EXAM_ID,
  CHANGE_USER_SOLUTION,
  CHANGE_SUB_QUESTION_ID,
  RESET_EXAM_PAGE
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
    ),
    handleChangeSolutions: solutions => dispatch(
      {
        solutions: solutions,
        type: CHANGE_SOLUTIONS
      }
    ),
    handleChangeExamId: examId => dispatch(
      {
        examId: examId,
        type: CHANGE_EXAM_ID
      }
    ),
    handleChangeUserSolution: comment => dispatch(
      {
        userSolution: comment,
        type: CHANGE_USER_SOLUTION
      }
    ),
    handleChangeSubQuestionId: subQuestionId => dispatch(
      {
        subQuestionId: subQuestionId,
        type: CHANGE_SUB_QUESTION_ID
      }
    ),
    handleResetExamPage: () => dispatch(
      {
        type: RESET_EXAM_PAGE
      }
    )
  }
);

class ExamPage extends Component {

  componentWillMount() {

    /* Reset the list of sub question solutions */
    this.props.handleChangeSolutions([]);
  }

  componentDidMount() {

    const examId = this.props.match.params.examId;

    this.props.handleChangeExamId(examId);

    Axios.get(
      `/api/exams/${examId}`
    ).then(
      res => this.props.handleSetQuestions(res.data)
    );
  }

  componentWillUnmount() {
    this.props.handleResetExamPage();
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
          <ExamSider
            handleChangeSolutions={this.props.handleChangeSolutions}
            handleSetQuestions={this.props.handleSetQuestions}
            handleChangeSubQuestionId={this.props.handleChangeSubQuestionId}
          />
        </Col>

        <Col
          xs={16}
          md={18}
          id="exam-page-content-container"
        >
          <ExamContent
            handleChangeUserSolution={this.props.handleChangeUserSolution}
            handleChangeSolutions={this.props.handleChangeSolutions}
          />
        </Col>

      </Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(ExamPage);
