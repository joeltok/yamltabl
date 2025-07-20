export interface IJsonInput {
  metadata: IJsonInputMetadata;
  rows: IJsonInputRows;
}

export interface IJsonInputRows {
  [key: string]: IJsonInputRow;
}

export interface IJsonInputRow {
  [key: string]: string;
}

export interface IJsonInputMetadata {
  yamltabl: string;
  config?: {};
  columns: {}[];
}
