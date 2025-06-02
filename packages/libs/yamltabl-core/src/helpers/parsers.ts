import { parse } from 'yaml';
import ejs from 'ejs';
import { minify } from 'html-minifier-terser';

import { IJsonInput } from '../types/types.js';
import { minifyConfig } from './configs.js';

export function parseYamlTableToJson(yamlString: string): IJsonInput {
  const jsonInputRaw = parse(yamlString);
  const { yamltable, config, columns, ...rows } = jsonInputRaw;
  const jsonTable = {
    metadata: {
      yamltable,
      config,
      columns,
    },
    rows,
  };
  return jsonTable;
}

export async function parseJsonTableToHtml(
  jsonInput: IJsonInput
): Promise<string> {
  const ejsTemplate = `
    <table>
      <thead>
        <tr>
          <% metadata.columns.forEach(column => { %>
            <th id="<%= Object.keys(column)[0] %>"><%= Object.values(column)[0] %></th>
          <% }) %>
        </tr>
      </thead>
      <tbody>
        <% Object.keys(rows).forEach(rowKey => { %>
          <tr id="<%= rowKey %>">
            <% metadata.columns.forEach(column => { %>
              <td><%- rows[rowKey][Object.keys(column)[0]] %></td>
            <% }) %>
          </tr>
        <% }) %>
      </tbody>
    </table>
  `;

  const htmlString = ejs.render(ejsTemplate, jsonInput);
  return await minify(htmlString, minifyConfig);
}


export async function parseJsonTableToMd(jsonInput: IJsonInput): Promise<string> {
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
