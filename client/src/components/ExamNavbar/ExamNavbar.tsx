import React from 'react';
import { Breadcrumb, Button, Col, Icon, Row } from 'antd';
import classNames from 'classnames';

import { notifyNotImplemented } from '../../tools/errorNotifier';
import classes from './ExamNavbar.module.less';

interface ExamNavbarProps {

}

const ExamNavbar: React.FC<ExamNavbarProps> = () => (
  <Row
    type='flex'
    align='middle'
    justify='space-between'
  >
    <Col>
      <Breadcrumb>
        <Breadcrumb.Item>
          Some
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Path
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col>
      <div
        className={classes.leftIcons}
      >
        <Icon
          type='edit'
          onClick={notifyNotImplemented}
          className={classes.iconButton}
        />
        <Icon
          type='star'
          onClick={notifyNotImplemented}
          className={classes.iconButton}
        />
        <Icon
          type='eye'
          onClick={notifyNotImplemented}
          className={classNames(
            classes.iconButton,
            classes.lastIcon
          )}
        />
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
