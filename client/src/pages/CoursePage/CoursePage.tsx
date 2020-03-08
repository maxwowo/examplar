import React from 'react';
import { Col, Layout, Row } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';
import PageContent from '../../components/PageContent/PageContent';
import courseModel, { Course } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';
import universityModel, { University } from '../../models/university';
import CourseSider from '../../components/CourseSider/CourseSider';
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
      <PageContent>
        <Layout
          className={classes.layout}
        >
          <Row
            type='flex'
            justify='space-between'
            className={classes.layoutRow}
          >
            <Col
              xs={24}
              md={8}
            >
              <CourseSider
                courseName={course?.name}
                courseCode={course?.code}
                universityName={university?.name}
              />
            </Col>
            <Col
              xs={24}
              md={14}
            >
              <CourseContent
                exams={[]}
              />
            </Col>
          </Row>
        </Layout>
      </PageContent>
    </PageLayout>
  );
};

export default withRouter(CoursePage);
