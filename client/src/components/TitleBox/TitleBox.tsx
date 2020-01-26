import React from 'react';

import Logo from '../Logo/Logo';
import Space from '../Space/Space';
import classes from './TitleBox.module.less';

interface TitleBoxProps {

}

const TitleBox: React.FC<TitleBoxProps> = () => (
  <div>
    <h1
      className={classes.title}
    >
      Find your
      <Space/>
      <Logo/>
    </h1>
    <h4
      className={classes.description}
    >
      The best solutions written by students, organized into one place.
    </h4>
  </div>
);

export default TitleBox;
