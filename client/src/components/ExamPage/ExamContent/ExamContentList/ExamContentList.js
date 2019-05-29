/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { List, Comment } from "antd";

const data = [
  {
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam assumenda commodi consequuntur cumque delectus ex excepturi fugiat illo ipsa minima neque nisi quidem, sapiente soluta suscipit temporibus tenetur vel."
  },
  {
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam assumenda commodi consequuntur cumque delectus ex excepturi fugiat illo ipsa minima neque nisi quidem, sapiente soluta suscipit temporibus tenetur vel."
  },
  {
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam assumenda commodi consequuntur cumque delectus ex excepturi fugiat illo ipsa minima neque nisi quidem, sapiente soluta suscipit temporibus tenetur vel."
  }
];

const ExamContentList = props => (
  <List
    header="3 solutions"
    dataSource={data}
    renderItem={item => (
      <Comment
        author="Anonymous"
        content={item.content}
      />
    )}
  >

  </List>
);

export default ExamContentList;
