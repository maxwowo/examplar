import React from 'react';
import { Empty } from 'antd';

import Latex from '../Latex/Latex';
import classes from './ExamContent.module.less';

interface ExamContentProps {
  content?: string;
}

const ExamContent: React.FC<ExamContentProps> = (
  {
    content
  }
) => (
  <div
    className={classes.examContent}
  >
    {
      content !== undefined && content.length === 0 ?
        <Empty
          description='No solution yet'
        />
        :
        <Latex>
          {content}
        </Latex>
    }
  </div>
);

export default ExamContent;
