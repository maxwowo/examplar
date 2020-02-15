import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';
import PageContent from '../../components/PageContent/PageContent';
import CourseResults from '../../components/CourseResults/CourseResults';
import SearchBar from '../../components/SearchBar/SearchBar';
import courseModel, { Course, CourseBody } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';

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
      courseModel.search(
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
    <PageLayout>
      <PageContent>
        <SearchBar/>
        <CourseResults
          loading={loading}
          courses={courses}
        />
      </PageContent>
    </PageLayout>
  );
};

export default withRouter(SearchPage);
