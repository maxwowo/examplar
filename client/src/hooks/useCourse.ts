import React from 'react';
import { Exam } from '../models/exam';
import courseModel, { Course } from '../models/course';
import { notifyConnectionError } from '../tools/errorNotifier';

const useCourse = (
  exam?: Exam
): [
  Course | undefined,
  boolean
] => {
  const [
    course,
    setCourse
  ] = React.useState<Course>();

  const [
    courseLoading,
    setCourseLoading
  ] = React.useState(true);

  React.useEffect(
    () => {
      if (exam !== undefined) {
        courseModel
          .get(
            exam.courseId
          )
          .then(res => {
            setCourse(res.course);
            setCourseLoading(false);
          })
          .catch(err => {
            notifyConnectionError(
              err,
              'Could not obtain course details.'
            );
          });
      }
    },
    [
      exam
    ]
  );

  return [
    course,
    courseLoading
  ];
};

export default useCourse;
