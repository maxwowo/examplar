/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Menu } from "antd";

/* Custom components */
import SubMenuButton from "./SubMenuButton/SubMenuButton";
import MenuButton from "./MenuButton/MenuButton";

/* Utility functions */
import {
  getQuestionHeader
} from "../utils";

/* Styles */
import "./ExamSider.less";
import Axios from "axios";

const { SubMenu } = Menu;

const mapStateToProps = state => (
  {
    questions: state.exam.questions
  }
);

const ExamSider = (
  {
    questions,
    handleChangeSolutions,
    handleSetQuestions
  }
) => {

  const handleMenuSelect = e => {
    const subQuestionId = e.key;

    Axios.get(
      `/api/subquestions/${subQuestionId}`
    ).then(
      res => handleChangeSolutions(
        res.data
      )
    );
  };

  return (
    <Menu
      mode="inline"
      id="exam-page-sider-menu"
      onSelect={handleMenuSelect}
    >
      {questions.map(currQuestion => (
        <SubMenu
          key={currQuestion.questionId}
          title={getQuestionHeader(
            currQuestion.questionHeader
          )}
        >
          {currQuestion.subQuestions.map(
            currSubQuestion => (
              <Menu.Item
                key={currSubQuestion.subQuestionId}
              >
                {currSubQuestion.subQuestionNum}
              </Menu.Item>
            )
          )}
          <SubMenuButton
            questionId={currQuestion.questionId}
            handleSetQuestions={handleSetQuestions}
          />
        </SubMenu>
      ))}
      <MenuButton
        handleSetQuestions={handleSetQuestions}
      />
    </Menu>
  );
};

export default connect(mapStateToProps)(ExamSider);
