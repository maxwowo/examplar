import React from 'react';
import { Link } from 'react-router-dom';
import { Empty, Icon, List, Spin, Typography } from 'antd';
import { ListProps } from 'antd/lib/list';

import { Exam } from '../../models/exam';
import classes from './CourseExams.module.less';

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

interface CourseExamsProps extends ListProps<Exam> {
  loading: boolean;
  exams: Exam[];
}

const CourseExams: React.FC<CourseExamsProps> = (
  {
    exams,
    loading
  }
) => (
  <List
    size='large'
    header={LIST_HEADER}
    dataSource={exams}
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
    className={classes.examsList}
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
);

export default CourseExams;
