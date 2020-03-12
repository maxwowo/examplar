import React from 'react';
import { Button, Card, Typography } from 'antd';

import { Course } from '../../models/course';
import { University } from '../../models/university';
import { notifyNotImplemented } from '../../tools/errorNotifier';
import CreateExamModal from '../CreateExamModal/CreateExamModal';
import classes from './CourseCard.module.less';

interface CourseCardProps {
  courseId: number;
  course?: Course;
  university?: University;
  loading: boolean;
}

const CourseCard: React.FC<CourseCardProps> = (
  {
    courseId,
    course,
    university,
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
        {course?.name} ({course?.code})
      </Typography.Title>

      <Typography.Paragraph>
        {university?.name}
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
