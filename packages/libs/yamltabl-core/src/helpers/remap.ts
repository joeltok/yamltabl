import { IJsonInput } from '../types/types'

export function remap(jsonInput: any): IJsonInput {
  const { yamltabl, config, columns, ...rows } = jsonInput;
  const jsonTable = {
    metadata: {
      yamltabl,
      config,
      columns,
    },
    rows,
  };
  return jsonTable;
}
