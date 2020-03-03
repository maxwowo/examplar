import React from 'react';
import { Icon, List, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { CourseItem } from '../../pages/SearchPage/SearchPage';
import EmptyCourseResults from '../EmptyCourseResults/EmptyCourseResults';

interface CourseResultsProps {
  loading: boolean;
  courseItems: CourseItem[];
}

const CourseResults: React.FC<CourseResultsProps> = (
  {
    loading,
    courseItems
  }
) => (
  <List
    size='large'
    header={
      <Typography.Text>
        Search results
      </Typography.Text>
    }
    dataSource={courseItems}
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
    renderItem={courseItem => (
      <List.Item>
        <List.Item.Meta
          title={
            <Link
              to={`/courses/${courseItem.id}`}
            >
              {courseItem.name}
            </Link>
          }
          description={`${courseItem.code} @ ${courseItem.universityName}`}
        />
      </List.Item>
    )}
  />
);

export default CourseResults;
