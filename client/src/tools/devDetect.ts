import process from 'process';

const development: boolean = process.env.NODE_ENV === 'development';

const isDev = () => {
  return development;
};

export default isDev;
