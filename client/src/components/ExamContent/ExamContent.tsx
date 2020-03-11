import React from 'react';

import classes from './ExamContent.module.less';

interface ExamContentProps {

}

const ExamContent: React.FC<ExamContentProps> = () => (
  <div
    className={classes.examContent}
  >
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores atque consectetur distinctio dolor ducimus
    harum hic inventore iure magni nisi nulla obcaecati, omnis quas quia rem sunt ullam vero.
  </div>
);

export default ExamContent;
