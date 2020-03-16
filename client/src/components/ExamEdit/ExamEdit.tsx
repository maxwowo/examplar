import React, { ChangeEventHandler } from 'react';
import { Button, Col, Input, Menu, Row } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Exam } from '../../models/exam';
import { Course } from '../../models/course';
import { Solution, solutionModel } from '../../models/solution';
import Dropdown from '../Dropdown/Dropdown';
import ExamContent from '../ExamContent/ExamContent';
import ExamBreadcrumb from '../ExamBreadcrumb/ExamBreadcrumb';
import { notifyConnectionError, notifyNotImplemented } from '../../tools/errorNotifier';
import IconButton from '../IconButton/IconButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
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
    <DropdownMenu>
      <Menu.Item
        onClick={toggleIsPreview}
      >
        Preview
      </Menu.Item>
      <Menu.Item
        onClick={notifyNotImplemented}
      >
        Publish without notifying watchers
      </Menu.Item>
      <Menu.Item
        onClick={notifyNotImplemented}
      >
        View changes
      </Menu.Item>
      <Menu.Item
        onClick={notifyNotImplemented}
      >
        Revert to last published version
      </Menu.Item>
    </DropdownMenu>
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
                  type='default'
                  onClick={toggleIsPreview}
                >
                  Back to edit
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
                <IconButton
                  type='more'
                />
              </Dropdown>
            )
          }
        </Col>
      </Row>
      {
        isPreview
          ?
          <ExamContent
            content={content}
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
