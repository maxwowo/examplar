import React from 'react';
import { Button, Card, Typography } from 'antd';

interface CourseSiderProps {
  courseName: string | undefined;
  courseCode: string | undefined;
  universityName: string | undefined;
}

const CourseSider: React.FC<CourseSiderProps> = (
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

    <Button>
      Follow course
    </Button>
  </Card>
);

export default CourseSider;
