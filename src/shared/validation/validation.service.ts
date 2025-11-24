import { zodValidationService } from '@/infra/services/zod-validation.service';
import type { ValidationError } from '../erros';

export class ValidationService {
  static validate<T>(schema: any, data: T): T | ValidationError[] {
    return zodValidationService.validate<T>(schema, data);
  }
}
