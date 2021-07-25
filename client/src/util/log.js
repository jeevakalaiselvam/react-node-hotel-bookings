import chalk from 'chalk';

export const log = (text, data) => {
  console.log(text, data === undefined ? '' : data);
};
