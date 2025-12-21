export interface JsonTable {
  metadata: Metadata;
  rows: Rows;
}

export interface Metadata {
  yamltabl: string;
  config?: {};
  columns: {}[];
}

export interface Rows {
  [key: string]: Row;
}

export interface Row {
  [key: string]: Cell;
}

export type Cell = string | Cell[] | { [key: string]: Cell };
