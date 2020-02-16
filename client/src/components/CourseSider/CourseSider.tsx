import React from 'react';
import { Button, Card, Layout, Typography } from 'antd';

import classes from './CourseSider.module.less';

interface CourseSiderProps {
  courseName: string;
  courseCode: string;
  universityName: string;
}

const CourseSider: React.FC<CourseSiderProps> = (
  {
    courseName,
    courseCode,
    universityName
  }
) => (
  <Layout.Sider
    width='100%'
    className={classes.sider}
  >
    <Card
      title={courseName}
      bordered={false}
      className={classes.card}
    >
      <Typography.Paragraph>
        {courseCode} @ {universityName}
      </Typography.Paragraph>

      <Button
        type='primary'
      >
        Add exam
      </Button>
    </Card>
  </Layout.Sider>
);

export default CourseSider;
