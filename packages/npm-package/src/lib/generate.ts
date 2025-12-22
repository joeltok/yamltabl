import { promises as fs } from 'fs';
import { Command } from 'commander';
import { minify } from 'html-minifier-terser';

import { renderHtml, renderMd } from '@yamltabl/yamltabl-core';
import { minifyConfig } from '../configs/configs';

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
        let str;
        if (format === 'html') {
          str = await minify(renderHtml(yamlString), minifyConfig)
        } else if (format === 'md') {
          str = renderMd(yamlString)
        } else {
          throw new Error(`${format} not supported`)
        }
        await fs.writeFile(opts.output, str);
        console.log('ok.');
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    });
}
