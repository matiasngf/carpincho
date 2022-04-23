// import path from 'path';

import chokidar from 'chokidar';

import chalk from 'chalk';
import { handleGenerateAsync } from './handleGenerateAsync';

export const compile = () => {
  const watcher = chokidar.watch('./routes/**/*.api.ts', {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  const pathList: string[] = [];

  watcher
  .on('add', path => {
    pathList.push(path)
  })
  .on('ready', () => {
    watcher.close();
    console.log(`${chalk.yellow('carpincho')} build started.`);
    handleGenerateAsync(pathList, 'production').then(() => {
      console.log(`${chalk.yellow('carpincho')} build completed.`);
    })
  })
}