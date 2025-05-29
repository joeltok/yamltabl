import { parseYamlTableToJson, parseJsonTableToHtml, parseJsonTableToMd } from '../helpers/parsers.js';
import { validateJsonTable } from '../helpers/validators.js';

export async function yamlTableToHTML(
  yamlTableString: string
): Promise<string> {
  const jsonTable = parseYamlTableToJson(yamlTableString);
  validateJsonTable(jsonTable);

  return await parseJsonTableToHtml(jsonTable);
}

export async function yamlTableToMd(
  yamlTableString: string
): Promise<string> {
  const jsonTable = parseYamlTableToJson(yamlTableString);
  validateJsonTable(jsonTable);

  return await parseJsonTableToMd(jsonTable);
}
