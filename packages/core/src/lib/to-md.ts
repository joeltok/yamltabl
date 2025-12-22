import { parse } from 'yaml';

import { remap, validateJsonTable } from '../helpers/remap';
import { reformatCells } from '../helpers/reformat-cells';
import { jsonToMd } from '../helpers/json-to-md';

export function renderMd(yamlString: string): string {
  const jsonTable = remap(parse(yamlString));
  validateJsonTable(jsonTable);

  const jsonTableCellFormatted = reformatCells(jsonTable);

  return jsonToMd(jsonTableCellFormatted);
}
