import React from 'react';

const development: boolean = '_self' in React.createElement('div');

const isDev = (): boolean => (
  development
);

export default isDev;
