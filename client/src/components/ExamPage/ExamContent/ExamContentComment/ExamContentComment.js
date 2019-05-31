/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Axios */
import Axios from "axios";

/* Ant Design components */
import { Typography, Row, Col, Input, Button, Switch } from "antd";

/* Styles */
import "./ExamContentComment.less";

const { TextArea } = Input;
const { Text } = Typography;

const mapStateToProps = state => (
  {
    userSolution: state.exam.userSolution,
    subQuestionId: state.exam.subQuestionId,
    solutions: state.exam.solutions
  }
);

const ExamContentComment = (
  {
    handleChangeUserSolution,
    userSolution,
    subQuestionId,
    solutions,
    handleChangeSolutions
  }
) => {

  const handleSubmit = e => {
    e.preventDefault();

    Axios.post(
      `/api/subquestions/${subQuestionId}`,
      {
        userSolution: userSolution
      }
    ).then(
      res => handleChangeSolutions(
        [
          ...solutions,
          {
            answerId: res.data,
            answerText: userSolution
          }
        ]
      )
    )
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Row
        id="exam-content-comment-container"
        type="flex"
        align="middle"
      >
        <Col span={24}>
          <TextArea
            autosize={{ minRows: 8 }}
            id="exam-content-comment-textarea"
            onChange={e => handleChangeUserSolution(e.target.value)}
          />
        </Col>
      </Row>

      <Row
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col>
          <Button
            type="primary"
            htmlType="submit"
          >
            Comment
          </Button>
        </Col>

        <Col>
          <Text
            id="exam-content-comment-preview"
          >
            Preview
          </Text>
          <Switch/>
        </Col>
      </Row>
    </form>
  );
};

export default connect(mapStateToProps)(ExamContentComment);
