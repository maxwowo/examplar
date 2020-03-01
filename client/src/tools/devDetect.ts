import React from 'react';

const development: boolean = '_self' in React.createElement('div');

const isDev = (): boolean => {
  console.log(development);
  return development;
};

export default isDev;
