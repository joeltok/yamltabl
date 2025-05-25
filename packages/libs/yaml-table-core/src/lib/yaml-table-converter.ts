import { parseYamlTableString, parseJsonTableToHtml, parseJsonTableToMd } from './parsers.js';
import {
  validateJsonInput,
} from './validators.js';

export async function yamlTableToHTML(
  yamlTableString: string
): Promise<string> {
  const { metadata, rows } = parseYamlTableString(yamlTableString);
  validateJsonInput({ metadata, rows });

  return await parseJsonTableToHtml({ metadata, rows });
}

export async function yamlTableToMd(
  yamlTableString: string
): Promise<string> {
  const { metadata, rows } = parseYamlTableString(yamlTableString);
  validateJsonInput({ metadata, rows });

  return await parseJsonTableToMd({ metadata, rows });
}
