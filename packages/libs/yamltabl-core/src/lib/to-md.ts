import { parse } from 'yaml';

import { remap } from '../helpers/remap';
import { reformatCells } from '../helpers/reformat-cells';
import { validateJsonTable } from '../helpers/validators';
import { parseJsonTableToMd } from '../helpers/parsers.js';

export async function yamlTableToMd(yamlTableString: string): Promise<string>  {
  const jsonInput = parse(yamlTableString);
  const jsonTableRemapped = remap(jsonInput)
  validateJsonTable(jsonTableRemapped);
  const jsonTableFormatted = reformatCells(jsonTableRemapped)

  return await parseJsonTableToMd(jsonTableFormatted);  
}