import { promises as fs } from 'fs';
import { Command } from 'commander';

import { yamlTableToHTML, yamlTableToMd } from '@yamltabl/yamltabl-core';

export function buildCommandGenerate(program: Command) {
  program
  .command('generate')
  .description('Generate a table from a yaml table')
  .argument('<format>', 'The format to generate the table in')
  .option('-i, --input <yamlTableFile>', 'The yaml table file to validate')
  .option('-o, --output <outputFile>', 'The output file to write the table to')
  .action(async (format: string, opts) => {
    const yamlTableFile = opts.input;
    const yamlTableString = await fs.readFile(yamlTableFile, 'utf8');
    try {
      const formatters = {
        html: yamlTableToHTML,
        md: yamlTableToMd,
      }
      const str = await formatters[format](yamlTableString);
      await fs.writeFile(opts.output, str);
      console.log('ok.')
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })

}
