export interface IJsonInput {
  metadata: IJsonInputMetadata;
  rows: IJsonInputRows;
}

export interface IJsonInputMetadata {
  yamltabl: string;
  config?: {};
  columns: {}[];
}

export interface IJsonInputRows {
  [key: string]: IJsonInputRow;
}

export interface IJsonInputRow {
  [key: string]: Cell;
}


export type Cell = 
  | string 
  | string[] 
  | { [key: string]: Cell } 
  | Cell[];