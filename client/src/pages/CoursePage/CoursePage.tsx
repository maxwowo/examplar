import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';
import courseModel, { Course } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';
import universityModel, { University } from '../../models/university';
import CourseCard from '../../components/CourseCard/CourseCard';
import CourseContent from '../../components/CourseContent/CourseContent';
import classes from './CoursePage.module.less';

interface CoursePageMatchParams {
  courseId: string;
}

interface CoursePageProps extends RouteComponentProps<CoursePageMatchParams> {

}

const CoursePage: React.FC<CoursePageProps> = (
  {
    match
  }
) => {
  // TODO: handle conversion error
  const courseId = Number(match.params.courseId);

  const [
    course,
    setCourse
  ] = React.useState<Course>();

  React.useEffect(
    () => {
      courseModel
        .get(
          courseId
        )
        .then(res => {
          setCourse(res.course);
        })
        .catch(err => {
          notifyConnectionError(
            err,
            'Could not obtain course details.'
          );
        });
    },
    [courseId]
  );

  const [
    university,
    setUniversity
  ] = React.useState<University>();

  React.useEffect(
    () => {
      if (course !== undefined) {
        universityModel
          .get(
            course.universityId
          )
          .then(res => {
            setUniversity(res.university);
          })
          .catch(err => {
            notifyConnectionError(
              err,
              'Could not obtain university details.'
            );
          });
      }
    },
    [
      course
    ]
  );

  return (
    <PageLayout>
      <div
        className={classes.coursePage}
      >
        <CourseCard
          courseName={course?.name}
          courseCode={course?.code}
          universityName={university?.name}
        />
        <CourseContent
          exams={[]}
        />
      </div>
    </PageLayout>
  );
};

export default withRouter(CoursePage);
