export class ValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.issues = issues;
  }
}
