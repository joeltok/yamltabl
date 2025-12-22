import { parse } from 'yaml';

import { remap, validateJsonTable } from '../helpers/remap';
import { reformatCells } from '../helpers/reformat-cells';
import { jsonToHtml } from '../helpers/json-to-html';

export function renderHtml(yamlString: string): string {
  const jsonTable = remap(parse(yamlString));
  validateJsonTable(jsonTable);

  const jsonTableFormatted = reformatCells(jsonTable);

  return jsonToHtml(jsonTableFormatted);
}
