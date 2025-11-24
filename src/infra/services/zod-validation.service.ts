import { ZodError, type ZodType } from 'zod';

import { ValidationError } from '@/shared/erros';

class ZodValidationService {
  private static instance: ZodValidationService;

  static getInstance(): ZodValidationService {
    if (!ZodValidationService.instance) {
      ZodValidationService.instance = new ZodValidationService();
    }
    return ZodValidationService.instance;
  }

  validate<T>(schema: ZodType<T>, data: T): T | ValidationError[] {
    try {
      const result = schema.parse(data);
      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        return error.issues.map(
          (issue) =>
            new ValidationError(issue.message, {
              details: {
                field: issue.path.join('.'),
                message: issue.message,
              },
            }),
        );
      }
      throw new ValidationError('Unknown validation error');
    }
  }
}

export const zodValidationService = ZodValidationService.getInstance();
