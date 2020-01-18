import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NotFound.module.less';

interface NotFoundProps {

}

const NotFound: React.FC<NotFoundProps> = () => (
  <div
    className={classes.notFound}
  >
    <section
      className={classes.textSection}
    >
      <div>
        <h1
          className={classes.title}
        >
          404
        </h1>
        <p
          className={classes.description}
        >
          Page not found,
          {' '}
          <Link
            to='/'
          >
            go back home
          </Link>
          .
        </p>
      </div>
    </section>
  </div>
);

export default NotFound;
