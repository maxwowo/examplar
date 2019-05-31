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
    showButton: true
  };

  toggleShowButton = () => this.setState(
    {
      showButton: !this.state.showButton
    }
  );

  handleAddSubQuestion = (id, subQuestionNumber) => {

    const newQuestions = [...this.props.questions];

    for (let q of newQuestions) {

      if (q.questionId === this.props.questionId) {
        q.subQuestions = [
          ...q.subQuestions,
          {
            subQuestionId: id,
            subQuestionNum: subQuestionNumber
          }
        ];

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
