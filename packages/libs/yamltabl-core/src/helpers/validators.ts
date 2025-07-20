import * as v from 'valibot';

import { IJsonInput, IJsonInputMetadata, IJsonInputRows } from '../types/types.js';
import { ValidationError } from '../errors/errors.js';

export function validateJsonTable({ metadata, rows }: IJsonInput): void {
  validateMetadata(metadata);
  validateRows(rows);
  validateRowsMatchColumns(rows, metadata.columns);
}

export function validateMetadata(metadata: IJsonInputMetadata): void {
  const errors = [];

  try {
    validateYamltableField(metadata.yamltabl);
  } catch (error) {
    errors.push((error as Error).message);
  }

  const result = v.safeParse(ColumnsSchema, metadata.columns);
  if (result.issues?.length) {
    result.issues.forEach((issue) => errors.push(issue.message));
  }

  if (errors.length) {
    throw new ValidationError(errors);
  }
}

function validateYamltableField(yamlField: string): void {
  if (yamlField !== '1.0.0') {
    throw new Error('missing field "yamltabl"');
  }
}

const ColumnsSchema = v.array(
  v.pipe(
    v.record(
      v.string(),
      v.string(),
      ({ input }) => `column "${input}" needs to be a key-value pair`
    ),
    v.check((input) => {
      if (Object.keys(input).length !== 1) {
        return false;
      }
      return true;
    }, 'each column should be of the form "{column_key}: {column_name}"'),
    v.check((input) => {
      const key = Object.keys(input)[0];
      if (!key.match(/^[a-zA-Z0-9_]+$/)) {
        return false;
      }
      return true;
    }, 'column keys can only be alphanumeric with underscores'),
    v.check((input) => {
      const key = Object.keys(input)[0];
      if (key === 'key' || key === 'config' || key === 'style') {
        return false;
      }
      return true;
    }, '"key | config | style" are protected and cannot be used as column keys')
  ),
  'missing field "columns"'
);

export function validateRows(rows: IJsonInputRows): void {
  const errors: string[] = [];

  const result = v.safeParse(RowsSchema, rows);
  if (result.issues?.length) {
    result.issues.forEach((issue) => errors.push(issue.message));
  }

  if (errors.length) {
    throw new ValidationError(errors);
  }
}

const RowSchema = v.record(
  v.string(),
  v.string(),
  ({ input }) => `expected "${input}" to be a list of key-value pairs`
);

const RowKeySchema = v.pipe(
  v.string(),
  v.check((input) => {
    if (!input.match(/^[a-zA-Z0-9_]+$/)) {
      return false;
    }
    return true;
  }, 'row keys can only be alphanumeric with underscores')
);

const RowsSchema = v.pipe(v.record(RowKeySchema, RowSchema));

export function validateRowsMatchColumns(
  rows: IJsonInputRows,
  columns: { [key: string]: string }[]
): void {
  const columnsHash: { [key: string]: boolean } = {};
  columns.forEach((column) => {
    columnsHash[Object.keys(column)[0]] = true;
  });

  Object.keys(rows).forEach((rowKey) => {
    const row = rows[rowKey];
    Object.keys(row).forEach((columnKey) => {
      if (!columnsHash[columnKey]) {
        throw new ValidationError([
          `"${rowKey}" has a column "${columnKey}" that is not pre-specified in the columns field`,
        ]);
      }
    });
  });
}
