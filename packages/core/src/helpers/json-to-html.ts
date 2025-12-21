import ejs from 'ejs';
import { minify } from 'html-minifier-terser';

import { JsonTable } from '../types/types.js';
import { minifyConfig } from './configs.js';

export async function jsonToHtml(jsonTable: JsonTable): Promise<string> {
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

  const htmlString = ejs.render(ejsTemplate, jsonTable);
  return await minify(htmlString, minifyConfig);
}
