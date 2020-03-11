import React from 'react';
import { Breadcrumb, Button, Col, Icon, Row } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
          <Link
            to='/'
          >
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Some
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Path
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col>
      <Icon
        type='edit'
        className={classes.iconButton}
      />
      <Icon
        type='star'
        className={classes.iconButton}
      />
      <Icon
        type='eye'
        className={classNames(
          classes.iconButton,
          classes.lastIcon
        )}
      />
      <Button
        type='primary'
      >
        Share
      </Button>
    </Col>
  </Row>
);

export default ExamNavbar;
