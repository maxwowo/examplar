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
  getQuestionHeader,
  getSolutions
} from "../utils";

/* Styles */
import "./ExamSider.less";

const { SubMenu } = Menu;

const mapStateToProps = state => (
  {
    questions: state.exam.questions
  }
);

const ExamSider = (
  {
    questions,
    handleChangeSolutions
  }
) => (
  <Menu
    mode="inline"
    id="exam-page-sider-menu"
    onSelect={e => handleChangeSolutions(getSolutions(e.key))}
  >
    {questions.map(currQuestion => (
      <SubMenu
        key={currQuestion.questionId}
        title={getQuestionHeader(currQuestion.questionHeader)}
      >
        {currQuestion.subQuestions.map(currSubQuestion => (
          <Menu.Item
            key={currSubQuestion.subQuestionId}
          >
            {currSubQuestion.subQuestionNum}
          </Menu.Item>
        ))}
        <SubMenuButton/>
      </SubMenu>
    ))}
    <MenuButton/>
  </Menu>
);

export default connect(mapStateToProps)(ExamSider);
