import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Layout from '../../components/Layout/Layout';
import CourseResults from '../../components/CourseResults/CourseResults';
import SearchBox from '../../components/SearchBox/SearchBox';
import { Course, CourseBody, searchByCourseUniversityId } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';
import classes from './SearchPage.module.less';

interface SearchProps extends RouteComponentProps {

}

const SearchPage: React.FC<SearchProps> = (
  {
    location
  }
) => {
  const params = new URLSearchParams(location.search);
  const course = params.get('course');
  const universityId = params.get('universityId');

  const [loading, setLoading] = React.useState(true);

  const [courses, setCourses] = React.useState<Course[]>([]);
  const getByCourseUniversityId = React.useCallback(
    () => {
      searchByCourseUniversityId(
        course ? course : '',
        universityId ? universityId : ''
      )
        .then(
          (
            res: CourseBody
          ) => {
            setCourses(res.courses);
            setLoading(false);
          }
        )
        .catch(
          (
            err: Error
          ) => {
            notifyConnectionError(
              err,
              'Could not obtain search results.'
            );
          }
        );
    },
    [
      course,
      universityId
    ]
  );
  React.useEffect(
    getByCourseUniversityId,
    [
      getByCourseUniversityId
    ]
  );

  return (
    <Layout>
      <div
        className={classes.resultsBox}
      >
        <SearchBox/>
        <CourseResults
          loading={loading}
          courses={courses}
        />
      </div>
    </Layout>
  );
};

export default withRouter(
  SearchPage
);
