import React, { ChangeEventHandler } from 'react';
import { Button, Col, Input, Row } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Exam } from '../../models/exam';
import { Course } from '../../models/course';
import { Solution, solutionModel } from '../../models/solution';
import ExamBreadcrumb from '../ExamBreadcrumb/ExamBreadcrumb';
import { notifyConnectionError } from '../../tools/errorNotifier';
import classes from './ExamEdit.module.less';

interface ExamEditProps extends RouteComponentProps {
  exam?: Exam;
  course?: Course;
  solution?: Solution;
}

const ExamEdit: React.FC<ExamEditProps> = (
  {
    history,
    exam,
    course,
    solution
  }
) => {

  const [
    content,
    setContent
  ] = React.useState<string | undefined>(solution?.content);

  const handleExamSubmit = () => {
    if (solution !== undefined) {
      solutionModel
        .update(
          solution.id,
          content ? content : ''
        )
        .then(() => {
          history.push(`/exams/${exam?.id}`);
        })
        .catch(err => {
          notifyConnectionError(
            err,
            'Could not obtain exam solution.'
          );
        });
    }
  };

  const handleTextAreaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    {
      target: {
        value
      }
    }
  ) => {
    console.log(value);
    setContent(value);
  };

  return (
    <div>
      <ExamBreadcrumb
        exam={exam}
        course={course}
      />
      <Input.TextArea
        value={content}
        onChange={handleTextAreaOnChange}
        placeholder='Start contributing now!'
        autoSize={
          {
            minRows: 4
          }
        }
        className={classes.textArea}
      />
      <Row
        type='flex'
        align='middle'
        justify='end'
      >
        <Col>
          <Button
            type='primary'
            onClick={handleExamSubmit}
            className={classes.submitButton}
          >
            Submit
          </Button>
          <Link
            to={`/exams/${exam?.id}`}
          >
            <Button>
              Cancel
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(ExamEdit);
