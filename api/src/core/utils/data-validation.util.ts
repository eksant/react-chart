import { validate, ValidationError } from 'class-validator';

export class DataValidationError {
  code?: number;
  message?: string;

  constructor(error: ValidationError) {
    this.code = this.normalizeCode(error.contexts);
    this.message = this.normalizeMessage(error.constraints);
  }

  private normalizeCode(contexts?: Record<string, any>): number | undefined {
    if (!contexts) return;
    const ctx = Object.values(contexts)[0] as Record<string, string>;
    if (!ctx) return;
    return parseInt(ctx.code);
  }

  private normalizeMessage(
    values?: Record<string, string>
  ): string | undefined {
    if (!values) return;
    return Object.values(values)[0];
  }
}

export async function validateDataOrReject<Data>(data: Data) {
  const errors = await validate(data as any, {
    stopAtFirstError: true,
    validationError: {
      target: false,
      value: false,
    },
  });

  if (errors.length) {
    throw new DataValidationError(errors[0]);
  }
}
