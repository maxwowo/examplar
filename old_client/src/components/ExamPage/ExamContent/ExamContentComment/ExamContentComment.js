/* React */
import React from "react";

/* Redux */
import { connect } from "react-redux";

/* Axios */
import Axios from "axios";

/* Ant Design components */
import {
  Typography,
  Row,
  Col,
  Input,
  Button,
  Switch,
  Divider,
  Empty
} from "antd";

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
    handleUpdateUserSolution,
    userSolution,
    subQuestionId,
    solutions,
    handleUpdateSolutions,
    solutionPreview,
    handleUpdatePreviewSwitchState,
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
          onChange={e => handleUpdateUserSolution(e.target.value)}
          value={userSolution}
        />
      </Col>
    </Row>
  );

  const emptyPreview = (
    <Empty
      description="Comment is empty"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

  const previewBox = (
    <div>
      <Divider id="exam-content-comment-top-divider"/>
      {!userSolution ? emptyPreview : <Latex content={userSolution}/>}
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

        handleUpdateSolutions(
          [
            ...solutions,
            {
              answerId: res.data,
              answerText: userSolution
            }
          ]
        );

        handleUpdateUserSolution(null);
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
          <Switch onChange={e => handleUpdatePreviewSwitchState(e)}/>
        </Col>
      </Row>
    </form>
  );
};

export default connect(mapStateToProps)(ExamContentComment);
