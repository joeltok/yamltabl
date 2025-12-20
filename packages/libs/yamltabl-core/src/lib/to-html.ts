import { parse } from 'yaml';

import { remap } from '../helpers/remap';
import { reformatCells } from '../helpers/reformat-cells';
import { parseJsonTableToHtml } from '../helpers/parsers.js';

export async function yamlTableToHTML(yamlTableString: string): Promise<string>  {
  const jsonInput = parse(yamlTableString);
  const jsonTableRemapped = remap(jsonInput)
  const jsonTableFormatted = reformatCells(jsonTableRemapped)

  return await parseJsonTableToHtml(jsonTableFormatted);  
}