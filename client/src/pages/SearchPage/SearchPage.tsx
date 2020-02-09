import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import CourseResults from '../../components/CourseResults/CourseResults';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Course, CourseBody, searchByCourseUniversityId } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';
import classes from './SearchPage.module.less';

interface SearchPageProps extends RouteComponentProps {

}

const SearchPage: React.FC<SearchPageProps> = (
  {
    location
  }
) => {
  const params = new URLSearchParams(location.search);
  const course = params.get('course');
  const universityId = params.get('universityId');

  const [
    loading,
    setLoading
  ] = React.useState(true);

  const [
    courses,
    setCourses
  ] = React.useState<Course[]>([]);
  const getByCourseUniversityId = React.useCallback(
    () => {
      searchByCourseUniversityId(
        course,
        universityId
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
        <SearchBar/>
        <CourseResults
          loading={loading}
          courses={courses}
        />
      </div>
    </Layout>
  );
};

export default withRouter(SearchPage);
