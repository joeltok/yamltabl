import { parse } from 'yaml';

import { remap, validateJsonTable } from '../helpers/remap';
import { reformatCells } from '../helpers/reformat-cells';
import { jsonToHtml } from '../helpers/json-to-html';

export async function renderHtml(yamlString: string): Promise<string> {
  const jsonTable = remap(parse(yamlString));
  validateJsonTable(jsonTable);

  const jsonTableFormatted = reformatCells(jsonTable);

  return await jsonToHtml(jsonTableFormatted);
}
