import React from 'react';
import { Link } from 'react-router-dom';
import { Empty, Layout, List, Typography } from 'antd';

import { Exam } from '../../models/exam';
import classes from './CourseContent.module.less';

const LIST_HEADER = (
  <Typography.Text>
    Exams
  </Typography.Text>
);

const EMPTY = (
  <Empty
    description="No exams yet"
    image={Empty.PRESENTED_IMAGE_SIMPLE}
  />
);

interface CourseContentProps {
  exams: Exam[];
}

const CourseContent: React.FC<CourseContentProps> = (
  {
    exams
  }
) => (
  <Layout.Content>
    <List
      size='large'
      header={LIST_HEADER}
      dataSource={exams}
      className={classes.courseContentList}
      locale={
        {
          emptyText: EMPTY
        }
      }
      renderItem={exam => (
        <List.Item>
          <List.Item.Meta
            title={
              <Link
                to={`/exams/${exam.id}`}
              >
                {exam.examYear} term {exam.examTerm}
              </Link>
            }
          />
        </List.Item>
      )}
    />
  </Layout.Content>
);

export default CourseContent;
