import React from 'react';
import { Breadcrumb, Button, Col, Icon, Row, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { notifyNotImplemented } from '../../tools/errorNotifier';
import { Course } from '../../models/course';
import { Exam } from '../../models/exam';
import classes from './ExamNavbar.module.less';

interface ExamNavbarProps {
  course?: Course;
  exam?: Exam;
  handleToggleDisplayExam: () => void;
}

const ExamNavbar: React.FC<ExamNavbarProps> = (
  {
    course,
    exam,
    handleToggleDisplayExam
  }
) => (
  <Row
    type='flex'
    align='middle'
    justify='space-between'
  >
    <Col>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link
            to={`/courses/${course?.id}`}
          >
            {course?.code}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {`${exam?.examYear} Term ${exam?.examTerm}`}
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col>
      <div
        className={classes.leftIcons}
      >
        <Tooltip
          title='Edit solution'
          placement='bottom'
        >
          <Icon
            type='edit'
            onClick={handleToggleDisplayExam}
            className={classes.iconButton}
          />
        </Tooltip>
        <Tooltip
          title='Save for later'
          placement='bottom'
        >
          <Icon
            type='star'
            onClick={notifyNotImplemented}
            className={classes.iconButton}
          />
        </Tooltip>
        <Tooltip
          title='Start watching'
          placement='bottom'
        >
          <Icon
            type='eye'
            onClick={notifyNotImplemented}
            className={classNames(
              classes.iconButton,
              classes.lastIcon
            )}
          />
        </Tooltip>
      </div>
      <Button
        type='primary'
        onClick={notifyNotImplemented}
      >
        Share
      </Button>
      <div
        className={classes.rightIcons}
      >
        <Icon
          type='more'
          onClick={notifyNotImplemented}
          className={classes.iconButton}
        />
      </div>
    </Col>
  </Row>
);

export default ExamNavbar;
