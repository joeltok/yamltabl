import { parse } from 'yaml';

import { remap, validateJsonTable, validateMetadata, validateRows, validateRowsMatchColumns } from './remap'
import { ValidationError } from '../errors/errors.js';

describe('remap', () => {
  it('should remap', () => {
    const jsonInput = {
      yamltabl: '2.0.0',
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
        yamltabl: '2.0.0',
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

describe('validations', () => {
  it('should validate the presence of mandatory properties', () => {
    const yamlString = `
      openapi: 1.0.0
    `;

    try {
      const jsonTable = remap(parse(yamlString));
      validateMetadata(jsonTable.metadata);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Validation failed');
      expect((error as ValidationError).issues).toEqual([
        'field "yamltabl" must use version 2.0.0',
        'missing field "columns"',
      ]);
    }
  });

  it('should validate that columns meet the schema', () => {
    const yamlString = `
      yamltabl: 2.0.0

      columns:
        - Column 1
        - Column 2
        - Column 3
        - column A: Column A
        - column-B: Column B
        - ColumnC: Column C
        - column_D: Column D
          column_extra: Column E
        - key: Column Key
        - config: Column Config
        - style: Column Style
    `;
    try {
      const jsonTable = remap(parse(yamlString));
      validateMetadata(jsonTable.metadata)
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Validation failed');
      expect((error as ValidationError).issues).toEqual([
        'column "Column 1" needs to be a key-value pair',
        'column "Column 2" needs to be a key-value pair',
        'column "Column 3" needs to be a key-value pair',
        'column keys can only be alphanumeric with underscores',
        'column keys can only be alphanumeric with underscores',
        'each column should be of the form "{column_key}: {column_name}"',
        '"key | config | style" are protected and cannot be used as column keys',
        '"key | config | style" are protected and cannot be used as column keys',
        '"key | config | style" are protected and cannot be used as column keys',
      ]);
    }
  });

  it('should validate that rows meet the schema', () => {
    const yamlString = `
      yamltabl: 2.0.0

      columns:
        - column1: Column 1
        - column2: Column 2

      row1: 
        column1: Row 1 x Column 1
        column2: Row 1 x Column 2
      Row 2: 
        column1: Row 2 x Column 1
        column2: Row 2 x Column 2
      row_3: Row 3 x No column specified
      row4: 
        column1: Row 4 x Column 1
    `;

    try {
      const jsonTable = remap(parse(yamlString));
      validateRows(jsonTable.rows);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Validation failed');
      expect((error as ValidationError).issues).toEqual([
        'row keys can only be alphanumeric with underscores',
        'expected "Row 3 x No column specified" to be a list of key-value pairs',
      ]);
    }
  });

  it('should validate that row columns match those in the columns field', () => {
    const yamlString = `
      yamltabl: 2.0.0

      columns:
        - column1: Column 1
        - column2: Column 2

      r1:
        column1: abc
        column2: def
        column3: ghi
    `;

    try {
      const jsonTable = remap(parse(yamlString));
      validateRowsMatchColumns(jsonTable.rows, jsonTable.metadata.columns);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Validation failed');
      expect((error as ValidationError).issues).toEqual([
        '"r1" has a column "column3" that is not pre-specified in the columns field',
      ]);
    }
  });
});