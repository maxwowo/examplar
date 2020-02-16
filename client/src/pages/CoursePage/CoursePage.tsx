import React from 'react';
import { Col, Row } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';
import PageContent from '../../components/PageContent/PageContent';
import courseModel, { Course } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';
import universityModel, { University } from '../../models/university';

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
    university,
    setUniversity
  ] = React.useState<University>();

  courseModel.get(
    courseId
  )
    .then(res => {
      setCourse(res.course);

      // universityModel.get(
      //   res.course.universityId
      // )
      //   .then(res => {
      //     setUniversity(res.university);
      //   })
      //   .catch(err => {
      //     notifyConnectionError(
      //       err,
      //       'Could not obtain university details.'
      //     );
      //   });
    })
    .catch(err => {
      notifyConnectionError(
        err,
        'Could not obtain course details.'
      );
    });

  return (
    <PageLayout>
      <PageContent>
        <Row
          type='flex'
          justify='space-between'
        >
          <Col
            xs={24}
            md={10}
          >
            course sider
          </Col>
        </Row>
      </PageContent>
    </PageLayout>
  );
};

export default withRouter(CoursePage);
