import ejs from 'ejs';

import { JsonTable } from '../types/types.js';

export function jsonToHtml(jsonTable: JsonTable): string {
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

  return ejs.render(ejsTemplate, jsonTable);
}
