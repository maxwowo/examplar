/* React */
import React, { Component } from "react";

/* Redux */
import { connect } from "react-redux";

/* Ant Design components */
import { Button, Input } from "antd";

/* Axios */
import Axios from "axios";

/* Style */
import "./SubMenuButton.less";

const { Group } = Input;

const mapStateToProps = state => (
  {
    questions: state.exam.questions
  }
);

class SubMenuButton extends Component {
  state = {

    /* Whether to show the button or the sub question input */
    showButton: true
  };

  toggleShowButton = () => this.setState(
    {
      showButton: !this.state.showButton
    }
  );

  /* Adds a sub question
  *  id: ID of the sub question to be added
  *  subQuestionNumber: Number of the sub question e.g. 1i */
  handleAddSubQuestion = (id, subQuestionNumber) => {

    const newQuestions = [...this.props.questions];

    /* Iterate through the list of questions */
    for (let q of newQuestions) {

      /* Find the question which we're inserting the new
      *  sub question into */
      if (q.questionId === this.props.questionId) {

        /* Update the sub question list of said question
        *  so that it contains the new sub question */
        q.subQuestions = [
          ...q.subQuestions,
          {
            subQuestionId: id,
            subQuestionNum: subQuestionNumber
          }
        ];

        /* Update Redux */
        this.props.handleSetQuestions(newQuestions);
      }
    }
  };

  handleSubmit = e => {

    /* New sub question number */
    const { value } = e.target;

    Axios.post(
      `/api/questions/${this.props.questionId}`,
      {
        subQuestionNumber: value
      }
    ).then(
      res => {
        this.handleAddSubQuestion(
          res.data,
          value
        );
        this.toggleShowButton();
      }
    );
  };

  render() {

    const button = (
      <Button
        icon="plus"
        type="primary"
        shape="circle"
        className="exam-page-sider-btn"
        onClick={this.toggleShowButton}
      />
    );

    const input = (
      <div id="exam-sider-sub-menu-group">
        <Group compact>
          <Input
            autoFocus
            id="exam-sider-sub-menu-input"
            name="subQuestion"
            onKeyPress={e => {
              if (e.key === "Enter") this.handleSubmit(e);
            }}
          />
          <Button
            onClick={this.toggleShowButton}
            htmlType="submit"
            icon="close"
            id="exam-sider-sub-menu-cancel-btn"
          />
        </Group>
      </div>
    );

    return (this.state.showButton ? button : input);
  }
}


export default connect(mapStateToProps)(SubMenuButton);
