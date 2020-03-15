import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import PageLayout from '../../components/PageLayout/PageLayout';
import CourseResults from '../../components/CourseResults/CourseResults';
import SearchBar from '../../components/SearchBar/SearchBar';
import courseModel, { Course } from '../../models/course';
import { notifyConnectionError } from '../../tools/errorNotifier';
import universityModel from '../../models/university';

export interface CourseItem extends Course {
  universityName: string;
}

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
    courseItems,
    setCourseItems
  ] = React.useState<CourseItem[]>([]);

  React.useEffect(
    () => {
      setLoading(true);
      courseModel.search(
        course,
        universityId
      )
        .then(res => {
          Promise
            .all(
              res.courses
                .map(course => (
                  universityModel
                    .get(course.universityId)
                    .then(res => (
                      {
                        ...course,
                        universityName: res.university.name
                      }
                    ))
                ))
            )
            .then(res => {
              setCourseItems(res);
              setLoading(false);
            });
        })
        .catch(err => {
          notifyConnectionError(
            err,
            'Could not obtain search results.'
          );
        });
    },
    [
      course,
      universityId
    ]
  );

  return (
    <PageLayout>
      <SearchBar/>
      <CourseResults
        loading={loading}
        courseItems={courseItems}
      />
    </PageLayout>
  );
};

export default withRouter(SearchPage);
