import React from 'react';
import { Button, Col, Icon, Row, Tooltip } from 'antd';
import classNames from 'classnames';

import { notifyNotImplemented } from '../../tools/errorNotifier';
import ExamBreadcrumb from '../ExamBreadcrumb/ExamBreadcrumb';
import { Course } from '../../models/course';
import { Exam } from '../../models/exam';
import classes from './ExamNavbar.module.less';

interface ExamNavbarProps {
  course?: Course;
  exam?: Exam;
}

const ExamNavbar: React.FC<ExamNavbarProps> = (
  {
    course,
    exam,
  }
) => (
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
      <div
        className={classes.leftIcons}
      >
        <Tooltip
          title='Edit solution'
          placement='bottom'
        >
          <Icon
            type='edit'
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
