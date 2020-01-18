import React from 'react';

import FullPage from '../../components/FullPage/FullPage';
import classes from './NotFound.module.less';

interface NotFoundProps {

}

const NotFound: React.FC<NotFoundProps> = () => (
  <FullPage>
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
            Page not found,{' '}
            <a
              href='/'
            >
              go back home
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  </FullPage>
);

export default NotFound;
