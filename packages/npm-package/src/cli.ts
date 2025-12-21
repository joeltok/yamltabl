#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';

import { buildCommandGenerate } from './lib/generate';

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

const program = new Command();

program
  .name('yamltabl')
  .version(pkg.version)
  .description(
    'A command line tool for converting structured yaml to html tables'
  );

buildCommandGenerate(program);

program.parse(process.argv);
