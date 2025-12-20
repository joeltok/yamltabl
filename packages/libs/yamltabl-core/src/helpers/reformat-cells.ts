import { IJsonInput, Cell } from '../types/types'

export function reformatCell(cell: Cell): string {
  return cell as string
}

export function reformatCells(table: Pick<IJsonInput, 'rows'>): IJsonInput {
  Object.keys(table.rows).forEach((rowKey) => {
    const row = table.rows[rowKey]
    Object.keys(row).forEach((columnKey) => {
      const cell = row[columnKey]
      reformatCell(cell)
    })
  })

  return table as IJsonInput;
}