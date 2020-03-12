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
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet atque necessitatibus vero! Autem distinctio
    dolor eaque est incidunt itaque modi quaerat quo sint? Cumque deserunt dolore dolorem ratione voluptates.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur blanditiis commodi distinctio eius
    eligendi, ipsa laboriosam mollitia nihil non optio praesentium quod rem, reprehenderit sequi velit voluptatum.
    Fugiat, quaerat.
  </div>
);

export default ExamContent;
