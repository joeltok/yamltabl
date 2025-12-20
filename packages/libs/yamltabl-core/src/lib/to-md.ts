import { parse } from 'yaml';

import { remap, validateJsonTable } from '../helpers/remap';
import { reformatCells } from '../helpers/reformat-cells';
import { jsonToMd } from '../helpers/json-to-md';

export async function renderMd(yamlString: string): Promise<string>  {
  const jsonTable = remap(parse(yamlString))
  validateJsonTable(jsonTable);

  const jsonTableCellFormatted = reformatCells(jsonTable)

  return await jsonToMd(jsonTableCellFormatted);  
}