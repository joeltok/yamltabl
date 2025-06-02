import { parseYamlTableToJson } from '../helpers/parsers';
import { validateJsonTable } from '../helpers/validators';

export function validateYamlTable(yamlTableString: string): void {
  const jsonTable = parseYamlTableToJson(yamlTableString);
  validateJsonTable(jsonTable);
}