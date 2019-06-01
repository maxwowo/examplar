/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { List, Comment, Empty, Typography } from "antd";

const { Text } = Typography;

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
        content={<pre>{item.answerText}</pre>}
      />
    )}
    locale={{ emptyText: empty }}
  />
);

export default connect(mapStateToProps)(ExamContentList);
