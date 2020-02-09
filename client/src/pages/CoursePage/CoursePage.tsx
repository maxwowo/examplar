import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';

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
    <Layout>
      course page
    </Layout>
  );
};

export default withRouter(CoursePage);
