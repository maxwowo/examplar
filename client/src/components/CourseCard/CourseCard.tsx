import React from 'react';
import { Button, Card, Typography } from 'antd';

import classes from './CourseCard.module.less';

interface CourseCardProps {
  courseName: string | undefined;
  courseCode: string | undefined;
  universityName: string | undefined;
}

const CourseCard: React.FC<CourseCardProps> = (
  {
    courseName,
    courseCode,
    universityName
  }
) => (
  <Card
    bordered={false}
  >
    <Typography.Title>
      {courseName} ({courseCode})
    </Typography.Title>
    <Typography.Paragraph>
      {universityName}
    </Typography.Paragraph>

    <Button
      type='primary'
    >
      Add exam
    </Button>

    <Button
      className={classes.followButton}
    >
      Follow course
    </Button>
  </Card>
);

export default CourseCard;
