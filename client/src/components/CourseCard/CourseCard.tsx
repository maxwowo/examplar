import React from 'react';
import { Button, Card, Typography } from 'antd';
import classes from './CourseCard.module.less';
import CreateExamModal from '../CreateExamModal/CreateExamModal';

interface CourseCardProps {
  courseId: number;
  courseName: string | undefined;
  courseCode: string | undefined;
  universityName: string | undefined;
  courseLoading: boolean;
  universityLoading: boolean;
}

const CourseCard: React.FC<CourseCardProps> = (
  {
    courseId,
    courseName,
    courseCode,
    universityName,
    courseLoading,
    universityLoading
  }
) => {

  const [
    modalVisible,
    setModalVisible
  ] = React.useState(false);

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
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

      <CreateExamModal
        courseId={courseId}
        visible={modalVisible}
        handleToggleModal={handleToggleModal}
      />

      <Button
        type='primary'
        onClick={handleToggleModal}
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
};

export default CourseCard;
