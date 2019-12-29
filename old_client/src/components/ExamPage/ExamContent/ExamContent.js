/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Layout } from "antd";

/* Custom components */
import ExamContentList from "./ExamContentList/ExamContentList";
import ExamContentComment from "./ExamContentComment/ExamContentComment";

/* Styles */
import "./ExamContent.less";

const { Content } = Layout;

const mapStateToProps = state => (
  {
    subQuestionId: state.exam.subQuestionId
  }
);

const ExamContent = (
  {
    handleUpdateSolutions,
    handleUpdateUserSolution,
    subQuestionId,
    handleUpdatePreviewSwitchState
  }
) => {

  /* Content to be displayed if a sub question has been
  *  selected */
  const content = (
    <Content id="exam-page-content">
      <ExamContentComment
        handleUpdateUserSolution={handleUpdateUserSolution}
        handleUpdateSolutions={handleUpdateSolutions}
        handleUpdatePreviewSwitchState={handleUpdatePreviewSwitchState}
      />
      <ExamContentList/>
    </Content>
  );

  /* Display the content if a sub question has been selected,
  *  otherwise display nothing */
  return !subQuestionId ? null : content;
};

export default connect(mapStateToProps)(ExamContent);