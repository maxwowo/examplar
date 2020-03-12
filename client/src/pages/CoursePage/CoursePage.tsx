import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';
import courseModel, { Course } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';
import universityModel, { University } from '../../models/university';
import CourseCard from '../../components/CourseCard/CourseCard';
import CourseExams from '../../components/CourseExams/CourseExams';
import classes from './CoursePage.module.less';
import examModel, { Exam } from '../../models/exam';

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
    [
      courseId
    ]
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

  const [
    exams,
    setExams
  ] = React.useState<Exam[]>([]);

  const [
    examsLoading,
    setExamsLoading
  ] = React.useState(true);

  React.useEffect(
    () => {
      examModel
        .search(
          courseId
        )
        .then(res => {
          setExams(res.exams);
          setExamsLoading(false);
        })
        .catch(err => {
          notifyConnectionError(
            err,
            'Could not obtain exams.'
          );
        });
    },
    [
      courseId
    ]
  );

  const courseCardLoading: boolean[] = [
    courseLoading,
    universityLoading
  ];

  return (
    <PageLayout>
      <div
        className={classes.coursePage}
      >
        <CourseCard
          courseId={courseId}
          courseName={course?.name}
          courseCode={course?.code}
          universityName={university?.name}
          loading={courseCardLoading.some(curr => curr)}
        />
        <CourseExams
          exams={exams}
          loading={examsLoading}
        />
      </div>
    </PageLayout>
  );
};

export default withRouter(CoursePage);
