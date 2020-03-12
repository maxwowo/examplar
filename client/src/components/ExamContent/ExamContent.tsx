import React from 'react';
import { Empty } from 'antd';

import { Solution } from '../../models/solution';
import Latex from '../Latex/Latex';
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
    {
      solution !== undefined && solution.content.length === 0 ?
        <Empty
          description='No solution yet'
        />
        :
        <Latex>
          {solution?.content}
        </Latex>
    }
  </div>
);

export default ExamContent;
