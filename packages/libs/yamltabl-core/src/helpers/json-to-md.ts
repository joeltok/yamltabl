import ejs from 'ejs';

import { IJsonInput } from '../types/types.js';

export async function jsonToMd(jsonInput: IJsonInput): Promise<string> {
  const ejsTemplate = `
| <% metadata.columns.forEach(c => { %><%= Object.values(c)[0] %> | <% }) %>
| <% metadata.columns.forEach(() => { %>---| <% }) %>
<% Object.values(rows).forEach(row => { %>| <% metadata.columns.forEach(c => {
  const key = Object.keys(c)[0];
  const val = row[key] ?? '';
%><%- sanitize(val.toString()) %> | <% }); %>
<% }); %>
`;

  const sanitize = (s: string): string =>
    s
      .replace(/\r?\n/g, '')     // Remove newlines
      .replace(/\s+/g, ' ')      // Collapse multiple spaces
      .replace(/\|/g, '\\|')     // Escape pipes
      .trim();

  return ejs.render(ejsTemplate.trim(), {
    metadata: jsonInput.metadata,
    rows: jsonInput.rows,
    sanitize,
  });
}
