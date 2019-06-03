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
  UPDATE_SOLUTIONS,
  UPDATE_EXAM_ID,
  UPDATE_USER_SOLUTION,
  UPDATE_SUB_QUESTION_ID,
  RESET_EXAM_PAGE,
  UPDATE_PREVIEW_SWITCH_STATE
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
    handleUpdateSolutions: solutions => dispatch(
      {
        solutions: solutions,
        type: UPDATE_SOLUTIONS
      }
    ),
    handleUpdateExamId: examId => dispatch(
      {
        examId: examId,
        type: UPDATE_EXAM_ID
      }
    ),
    handleUpdateUserSolution: comment => dispatch(
      {
        userSolution: comment,
        type: UPDATE_USER_SOLUTION
      }
    ),
    handleUpdateSubQuestionId: subQuestionId => dispatch(
      {
        subQuestionId: subQuestionId,
        type: UPDATE_SUB_QUESTION_ID
      }
    ),
    handleResetExamPage: () => dispatch(
      {
        type: RESET_EXAM_PAGE
      }
    ),
    handleUpdatePreviewSwitchState: previewSwitchState => dispatch(
      {
        previewSwitchState: previewSwitchState,
        type: UPDATE_PREVIEW_SWITCH_STATE
      }
    )
  }
);

class ExamPage extends Component {

  componentWillMount() {

    /* Reset the list of sub question solutions */
    this.props.handleUpdateSolutions([]);
  }

  componentDidMount() {

    const examId = this.props.match.params.examId;

    this.props.handleUpdateExamId(examId);

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
            handleUpdateSolutions={this.props.handleUpdateSolutions}
            handleSetQuestions={this.props.handleSetQuestions}
            handleUpdateSubQuestionId={this.props.handleUpdateSubQuestionId}
          />
        </Col>

        <Col
          xs={16}
          md={18}
          id="exam-page-content-container"
        >
          <ExamContent
            handleUpdateUserSolution={this.props.handleUpdateUserSolution}
            handleUpdateSolutions={this.props.handleUpdateSolutions}
            handleUpdatePreviewSwitchState={this.props.handleUpdatePreviewSwitchState}
          />
        </Col>

      </Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(ExamPage);
