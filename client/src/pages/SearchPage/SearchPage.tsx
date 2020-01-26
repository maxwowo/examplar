import React from 'react';

import Layout from '../../components/Layout/Layout';
import SearchBox from '../../components/SearchBox/SearchBox';
import classes from './SearchPage.module.less';

interface SearchProps {

}

const SearchPage: React.FC<SearchProps> = () => (
  <Layout>
    <div
      className={classes.resultsBox}
    >
      <SearchBox/>
    </div>
  </Layout>
);

export default SearchPage;
