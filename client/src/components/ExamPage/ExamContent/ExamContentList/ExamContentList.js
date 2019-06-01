/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { List, Comment, Empty } from "antd";

/* Custom components */
import SolutionContent from "./SolutionContent/SolutionContent";

const mapStateToProps = state => (
  {
    solutions: state.exam.solutions
  }
);

const empty = (
  <Empty
    description="No solutions yet"
    image={Empty.PRESENTED_IMAGE_SIMPLE}
  />
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
        content={<SolutionContent content={item.answerText}/>}
      />
    )}
    locale={{ emptyText: empty }}
  />
);

export default connect(mapStateToProps)(ExamContentList);
