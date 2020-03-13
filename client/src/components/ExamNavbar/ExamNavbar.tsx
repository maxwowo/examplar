import React from 'react';
import { Button, Col, Icon, notification, Row, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

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
    exam
  }
) => {
  const handleShare = () => {
    notification.success(
      {
        message: 'Copied URL to clipboard.'
      }
    );
  };

  return (
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
            <Link
              to={`/exams/${exam?.id}/edit`}
            >
              <Icon
                type='edit'
                className={classes.iconButton}
              />
            </Link>
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
        <CopyToClipboard
          text={window.location.toString()}
          onCopy={handleShare}
        >
          <Button
            type='primary'
          >
            Share
          </Button>
        </CopyToClipboard>
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
};

export default ExamNavbar;
