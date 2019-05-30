/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Axios */
import Axios from "axios";

/* Ant Design components */
import { Button } from "antd";

/* Styles */
import "./MenuButton.less";

const mapStateToProps = state => (
  {
    questions: state.exam.questions,
    examId: state.exam.examId
  }
);

const MenuButton = (
  {
    questions,
    examId,
    handleSetQuestions
  }
) => {
  const handleButtonClicked = () => {

    /* Calculate new question header */
    const newQuestionHeader = questions.length + 1;

    Axios.post(
      `/api/exams/${examId}`,
      {
        questionHeader: newQuestionHeader
      }
    ).then(
      res => {
        handleSetQuestions(
          [
            ...questions,
            {
              questionId: res.data,
              questionHeader: newQuestionHeader,
              subQuestions: []
            }
          ]
        )
      }
    );
  };

  return (
    <Button
      icon="plus"
      shape="round"
      type="primary"
      id="exam-page-sider-menu-btn"
      className="exam-page-sider-btn"
      onClick={handleButtonClicked}
    />
  );
};

export default connect(mapStateToProps)(MenuButton);
