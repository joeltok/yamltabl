import { promises as fs } from 'fs';
import { Command } from 'commander';

import { renderHtml, renderMd } from '@yamltabl/yamltabl-core';

export function buildCommandGenerate(program: Command) {
  program
    .command('generate')
    .description(
      'Render a structured yaml file into a formatted Html or Markdown table'
    )
    .argument('<format>', 'The format to generate the table in (html / md)')
    .option('-i, --input <yamlFile>', 'The yaml file as input')
    .option(
      '-o, --output <outputFile>',
      'The output file to write the table to'
    )
    .action(async (format: string, opts) => {
      const yamlFile = opts.input;
      const yamlString = await fs.readFile(yamlFile, 'utf8');
      try {
        const formatters = {
          html: renderHtml,
          md: renderMd,
        };
        const str = await formatters[format](yamlString);
        await fs.writeFile(opts.output, str);
        console.log('ok.');
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    });
}
