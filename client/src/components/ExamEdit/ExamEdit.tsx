import React, { ChangeEventHandler } from 'react';
import { Button, Col, Dropdown, Input, Menu, Row } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Exam } from '../../models/exam';
import { Course } from '../../models/course';
import { Solution, solutionModel } from '../../models/solution';
import ExamContent from '../ExamContent/ExamContent';
import ExamBreadcrumb from '../ExamBreadcrumb/ExamBreadcrumb';
import { notifyConnectionError } from '../../tools/errorNotifier';
import IconButton from '../IconButton/IconButton';
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
    isPreview,
    setIsPreview
  ] = React.useState(false);

  const toggleIsPreview = () => {
    setIsPreview(!isPreview);
  };

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
    setContent(value);
  };

  const moreMenu = (
    <Menu>
      <Menu.Item
        onClick={toggleIsPreview}
      >
        Preview
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Row
        type='flex'
        align='middle'
        justify='space-between'
      >
        <Col>
          <ExamBreadcrumb
            exam={exam}
            course={course}
          />
        </Col>
        <Col>
          {
            isPreview
              ?
              (
                <Button
                  type='primary'
                  onClick={toggleIsPreview}
                >
                  Edit
                </Button>
              )
              :
              (
                <React.Fragment>
                  <Button
                    type='primary'
                    onClick={handleExamSubmit}
                    className={classes.rowButton}
                  >
                    Submit
                  </Button>
                  <Link
                    to={`/exams/${exam?.id}`}
                    className={classes.rowButton}
                  >
                    <Button>
                      Cancel
                    </Button>
                  </Link>
                </React.Fragment>
              )
          }
          {
            !isPreview
            &&
            (
              <Dropdown
                overlay={moreMenu}
                trigger={
                  [
                    'click'
                  ]
                }
                placement='bottomRight'
              >
                <div style={{ all: 'unset' }}>
                  <IconButton
                    type='more'
                  />
                </div>
              </Dropdown>
            )
          }
        </Col>
      </Row>
      {
        isPreview
          ?
          <ExamContent
            solution={solution}
          />
          :
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
      }
    </div>
  );
};

export default withRouter(ExamEdit);
