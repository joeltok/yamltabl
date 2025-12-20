import { remap } from './remap'

describe('parseYamlTableString', () => {
  it('should parse a yaml table into json', () => {
    const jsonInput = {
      yamltabl: '1.0.0',
      config: undefined,
      columns: [
        { column1: 'Column 1' },
        { column2: 'Column 2' },
        { column3: 'Column 3' },
      ],
      row_1: {
        column1: 'Cell 1A',
        column2: 'Cell 1B',
        column3: 'Cell 1C',
      },
    }
    const result = remap(jsonInput)
    const expected = {
      metadata: {
        yamltabl: '1.0.0',
        config: undefined,
        columns: [
          { column1: 'Column 1' },
          { column2: 'Column 2' },
          { column3: 'Column 3' },
        ],
      },
      rows: {
        row_1: {
          column1: 'Cell 1A',
          column2: 'Cell 1B',
          column3: 'Cell 1C',
        },
      },
    };

    expect(result).toEqual(expected)
  });
});