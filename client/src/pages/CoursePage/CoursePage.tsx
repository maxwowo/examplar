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

  const [
    courseLoading,
    setCourseLoading
  ] = React.useState(true);

  React.useEffect(
    () => {
      courseModel
        .get(
          courseId
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
    },
    [courseId]
  );

  const [
    university,
    setUniversity
  ] = React.useState<University>();

  const [
    universityLoading,
    setUniversityLoading
  ] = React.useState(true);

  React.useEffect(
    () => {
      if (course !== undefined) {
        universityModel
          .get(
            course.universityId
          )
          .then(res => {
            setUniversity(res.university);
            setUniversityLoading(false);
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
          courseLoading={courseLoading}
          universityLoading={universityLoading}
        />
        <CourseContent
          exams={[]}
        />
      </div>
    </PageLayout>
  );
};

export default withRouter(CoursePage);
