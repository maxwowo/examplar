import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom';

import { Exam } from '../../models/exam';
import { Course } from '../../models/course';
import { Solution } from '../../models/solution';
import ExamBreadcrumb from '../ExamBreadcrumb/ExamBreadcrumb';
import classes from './ExamEdit.module.less';

interface ExamEditProps {
  exam?: Exam;
  course?: Course;
  solution?: Solution;
}

const ExamEdit: React.FC<ExamEditProps> = (
  {
    exam,
    course,
    solution
  }
) => {
  const handleExamSubmit = () => {

  };

  return (
    <div>
      <ExamBreadcrumb
        exam={exam}
        course={course}
      />
      <Input.TextArea
        value={solution?.content}
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

export default ExamEdit;
