import React from 'react';
import { Button, Card, Typography } from 'antd';

import classes from './CourseCard.module.less';

interface CourseCardProps {
  courseName: string | undefined;
  courseCode: string | undefined;
  universityName: string | undefined;
  courseLoading: boolean;
  universityLoading: boolean;
}

const CourseCard: React.FC<CourseCardProps> = (
  {
    courseName,
    courseCode,
    universityName,
    courseLoading,
    universityLoading
  }
) => (
  <Card
    loading={courseLoading || universityLoading}
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
