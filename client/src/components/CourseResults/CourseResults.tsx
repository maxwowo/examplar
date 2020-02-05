import React from 'react';
import { Icon, List, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { Course } from '../../models/course';
import EmptyCourseResults from '../EmptyCourseResults/EmptyCourseResults';

interface CourseResultsProps {
  loading: boolean;
  courses: Course[];
}

const CourseResults: React.FC<CourseResultsProps> = (
  {
    loading,
    courses
  }
) => (
  <List
    size='large'
    header={
      <Typography.Text>
        Search results
      </Typography.Text>
    }
    dataSource={courses}
    locale={
      {
        emptyText: (
          <EmptyCourseResults/>
        )
      }
    }
    loading={
      {
        spinning: loading,
        indicator: (
          <Spin
            indicator={
              <Icon
                type='loading'
                spin
              />
            }
          />
        )
      }
    }
    renderItem={course => (
      <List.Item>
        <List.Item.Meta
          title={
            <Link
              to={`/courses/${course.id}`}
            >
              {course.name}
            </Link>
          }
          description={`${course.code} @ some university`}
        />
      </List.Item>
    )}
  />
);

export default CourseResults;
