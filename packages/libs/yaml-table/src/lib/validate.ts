import { promises as fs } from 'fs';
import { Command } from 'commander';

import { validateJsonInput, parseYamlTableString } from '@yaml-table/yaml-table-core';

export function buildCommandValidate(program: Command) {
  program
  .command('validate')
  .description('Validate a yaml table')
  .option('-i, --input <yamlTableFile>', 'The yaml table file to validate')
  .action(async (opts) => {
    const yamlTableFile = opts.input;
    const yamlTableString = await fs.readFile(yamlTableFile, 'utf8');
    try {
      validateJsonInput(parseYamlTableString(yamlTableString));
      console.log('ok.')
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })

}
