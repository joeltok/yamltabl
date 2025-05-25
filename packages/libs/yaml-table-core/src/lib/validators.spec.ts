import { ValidationError } from './errors.js';
import { parseYamlTableString } from './parsers.js';
import {
  validateMetadata,
  validateRows,
  validateRowsMatchColumns,
} from './validators.js';

describe('validateYamlTable', () => {
  it('should validate the presence of mandatory properties', () => {
    const yamlString = `
      openapi: 1.0.0
    `;

    try {
      const { metadata } = parseYamlTableString(yamlString);
      validateMetadata(metadata);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Validation failed');
      expect((error as ValidationError).issues).toEqual([
        'missing field "yamltable"',
        'missing field "columns"',
      ]);
    }
  });

  it.skip('should validate that table configurations are supported', () => {});

  it('should validate that columns meet the schema', () => {
    const yamlString = `
      yamltable: 1.0.0

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
      const { metadata } = parseYamlTableString(yamlString);
      validateMetadata(metadata);
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
      yamltable: 1.0.0

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
      const { rows } = parseYamlTableString(yamlString);
      validateRows(rows);
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
      yamltable: 1.0.0

      columns:
        - column1: Column 1
        - column2: Column 2

      r1:
        column1: abc
        column2: def
        column3: ghi
    `;

    try {
      const { metadata, rows } = parseYamlTableString(yamlString);
      validateRowsMatchColumns(rows, metadata.columns);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Validation failed');
      expect((error as ValidationError).issues).toEqual([
        '"r1" has a column "column3" that is not pre-specified in the columns field',
      ]);
    }
  });
});

// describe('extractRows', () => {
//   it.skip ('should extract rows from a parsed yaml table', () => {
//     const rowsObject = {
//       r1: {
//         c1: "abc",
//         c2: "def",
//         c3: "ghi",
//       },
//       r2: {
//         c3: "jkl",
//       }
//     }

//     const rowsResult = [
//       {
//         key: "r1",
//         c1: "abc",
//         c2: "def",
//         c3: "ghi",
//       },
//       {
//         key: "r2",
//         c3: "jkl",
//       }
//     ]

//     const rows: IRow[] = extractRows(rowsObject)
//     expect(rows).toEqual(rowsResult);

//   })
// })
