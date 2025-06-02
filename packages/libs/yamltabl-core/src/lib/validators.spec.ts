import { validateYamlTable } from './validators'
import { ValidationError } from '../errors/errors'

describe('validateYamlTable', () => {
  it('should validate the presence of mandatory properties', () => {
    const yamlString = `
      openapi: 1.0.0
    `;

    try {
      validateYamlTable(yamlString);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Validation failed');
      expect((error as ValidationError).issues).toEqual([
        'missing field "yamltable"',
        'missing field "columns"',
      ]);
    }
  });
})