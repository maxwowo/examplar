import React from 'react';
import { Empty } from 'antd';

import { Solution } from '../../models/solution';
import classes from './ExamContent.module.less';

interface ExamContentProps {
  solution?: Solution;
}

const ExamContent: React.FC<ExamContentProps> = (
  {
    solution
  }
) => (
  <div
    className={classes.examContent}
  >
    {solution !== undefined && solution.content.length === 0 ? <Empty
      description='No solution yet'
    /> : solution?.content}
  </div>
);

export default ExamContent;
