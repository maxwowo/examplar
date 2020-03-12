import React from 'react';

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
    {solution?.content}
  </div>
);

export default ExamContent;
