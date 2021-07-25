import chalk from 'chalk';

export const g = (text, data) => {
  console.log(
    chalk.white('-------------------------------------------------------')
  );
  console.log(chalk.green(text), data === undefined ? '' : data);
};

export const r = (text, data) => {
  console.log(
    chalk.white('-------------------------------------------------------')
  );
  console.log(chalk.red(text), data === undefined ? '' : data);
};

export const b = (text, data) => {
  console.log(
    chalk.white('-------------------------------------------------------')
  );
  console.log(chalk.blue(text), data === undefined ? '' : data);
};

export const y = (text, data) => {
  console.log(
    chalk.white('-------------------------------------------------------')
  );
  console.log(chalk.yellow(text), data === undefined ? '' : data);
};
