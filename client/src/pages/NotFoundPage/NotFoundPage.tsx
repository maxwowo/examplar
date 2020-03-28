import React from 'react';
import { Link } from 'react-router-dom';

import Space from '../../components/Space/Space';
import classes from './NotFoundPage.module.less';

interface NotFoundProps {

}

const NotFoundPage: React.FC<NotFoundProps> = () => (
  <div
    className={classes.notFound}
  >
    <section
      className={classes.textSection}
    >
      <h1
        className={classes.title}
      >
        404!
      </h1>
      <p
        className={classes.description}
      >
        Page not found,
        <Space/>
        <Link
          to='/'
        >
          go back
        </Link>
        .
      </p>
    </section>
  </div>
);

export default NotFoundPage;
