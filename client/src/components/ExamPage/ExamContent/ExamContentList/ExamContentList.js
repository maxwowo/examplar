/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { List, Comment } from "antd";

const mapStateToProps = state => (
  {
    solutions: state.exam.solutions
  }
);

const ExamContentList = (
  {
    solutions
  }
) => (
  <List
    header={`${solutions.length} solutions`}
    dataSource={solutions}
    renderItem={item => (
      <Comment
        author="Anonymous"
        content={item.answerText}
      />
    )}
  >

  </List>
);

export default connect(mapStateToProps)(ExamContentList);
