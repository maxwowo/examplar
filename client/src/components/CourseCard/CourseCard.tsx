import React from 'react';
import { Button, Card, Typography } from 'antd';

import { notifyNotImplemented } from '../../tools/errorNotifier';
import CreateExamModal from '../CreateExamModal/CreateExamModal';
import classes from './CourseCard.module.less';

interface CourseCardProps {
  courseId: number;
  courseName: string | undefined;
  courseCode: string | undefined;
  universityName: string | undefined;
  loading: boolean;
}

const CourseCard: React.FC<CourseCardProps> = (
  {
    courseId,
    courseName,
    courseCode,
    universityName,
    loading
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
      loading={loading}
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
        onClick={notifyNotImplemented}
      >
        Follow course
      </Button>
    </Card>
  );
};

export default CourseCard;
