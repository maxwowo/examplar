import React from 'react';
import { Col, Row } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';
import PageContent from '../../components/PageContent/PageContent';

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
  const courseId = Number(match.params.courseId);

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
