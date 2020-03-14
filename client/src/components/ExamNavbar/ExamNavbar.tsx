import React from 'react';
import { Button, Col, notification, Row } from 'antd';
import { Link } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import { notifyNotImplemented } from '../../tools/errorNotifier';
import ExamBreadcrumb from '../ExamBreadcrumb/ExamBreadcrumb';
import { Course } from '../../models/course';
import { Exam } from '../../models/exam';
import TooltipIconButton from '../TooltipIconButton/TooltipIconButton';
import IconButton from '../IconButton/IconButton';
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
          <Link
            to={`/exams/${exam?.id}/edit`}
          >
            <TooltipIconButton
              iconType='edit'
              tooltipTitle='Edit solution'
              tooltipPlacement='bottom'
            />
          </Link>
          <TooltipIconButton
            iconType='star'
            tooltipTitle='Save for later'
            tooltipPlacement='bottom'
            onClick={notifyNotImplemented}
          />
          <TooltipIconButton
            iconType='eye'
            tooltipTitle='Start watching'
            tooltipPlacement='bottom'
            onClick={notifyNotImplemented}
          />
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
          <IconButton
            type='more'
            onClick={notifyNotImplemented}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ExamNavbar;
