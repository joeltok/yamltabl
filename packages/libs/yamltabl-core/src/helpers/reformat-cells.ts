import * as v from 'valibot';
import ejs from 'ejs';

import { JsonTable, Cell } from '../types/types'
import { ValidationError } from '../errors/errors.js';



export function reformatCell(node: Cell): string {
  if (typeof node === 'string') {
    return node
  }

  if (Array.isArray(node)) {
    const ejsTemplate = `
      <ul>
        <% node.forEach(childNode => { %>
          <li><%- reformatCell(childNode) -%></li>
        <% }) %>
      </ul>
    `;

    return ejs.render(ejsTemplate, { node, reformatCell });
  }

  const bullet = Object.keys(node)[0]
  const subbullets = node[bullet]
  const ejsTemplate = `
    <%- bullet -%>
    <%- reformatCell(subbullets) -%>
  `
  return ejs.render(ejsTemplate, { bullet, subbullets, reformatCell });
}

export function reformatCells(table: Pick<JsonTable, 'rows'>): JsonTable {
  Object.keys(table.rows).forEach((rowKey) => {
    const row = table.rows[rowKey]
    Object.keys(row).forEach((columnKey) => {
      const cell = row[columnKey]
      validateCellSchema(cell);
      row[columnKey] = reformatCell(cell)
    })
  })
  return table as JsonTable;
}

export const CellSchema: v.GenericSchema<Cell> = v.lazy(() => 
  v.union([
    v.string(),
    v.record(v.string(), v.lazy(() => CellSchema)),
    v.array(v.lazy(() => CellSchema))
  ], ({ input }) => `cell "${input}" is not of the expected format`)
);

export function validateCellSchema(cell: Cell): void {
  const errors: string[] = [] 

  const result = v.safeParse(CellSchema, cell);
  if (result.issues?.length) {
    result.issues.forEach((issue) => errors.push(issue.message));
  }

  if (errors.length) {
    throw new ValidationError(errors);
  }
}



