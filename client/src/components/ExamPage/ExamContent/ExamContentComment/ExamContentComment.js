/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Axios */
import Axios from "axios";

/* Ant Design components */
import { Typography, Row, Col, Input, Button, Switch, Divider } from "antd";

/* Custom components */
import Latex from "../../../Latex/Latex";

/* Styles */
import "./ExamContentComment.less";

const { TextArea } = Input;
const { Text } = Typography;

const mapStateToProps = state => (
  {
    userSolution: state.exam.userSolution,
    subQuestionId: state.exam.subQuestionId,
    solutions: state.exam.solutions,
    solutionPreview: state.exam.solutionPreview,
    previewSwitchState: state.exam.previewSwitchState
  }
);

const ExamContentComment = (
  {
    handleChangeUserSolution,
    userSolution,
    subQuestionId,
    solutions,
    handleChangeSolutions,
    solutionPreview,
    handleChangePreviewSwitchState,
    previewSwitchState
  }
) => {

  const commentBox = (
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
          value={userSolution}
        />
      </Col>
    </Row>
  );

  const previewBox = (
    <div>
      <Divider/>
      <Latex content={userSolution}/>
      <Divider/>
    </div>
  );

  const handleSubmit = e => {
    e.preventDefault();

    Axios.post(
      `/api/subquestions/${subQuestionId}`,
      {
        userSolution: userSolution
      }
    ).then(
      res => {

        handleChangeSolutions(
          [
            ...solutions,
            {
              answerId: res.data,
              answerText: userSolution
            }
          ]
        );

        handleChangeUserSolution(null);
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      {!previewSwitchState ? commentBox : previewBox}

      <Row>
        <Col span={24}>
          {solutionPreview}
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
          <Switch onChange={e => handleChangePreviewSwitchState(e)}/>
        </Col>
      </Row>
    </form>
  );
};

export default connect(mapStateToProps)(ExamContentComment);
