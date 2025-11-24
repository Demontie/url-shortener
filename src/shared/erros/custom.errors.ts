import type { ErrorOptions } from './base.error';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from './generic.errors';

export class AlreadyError extends ConflictError {
  constructor(resource = 'Resource', options: ErrorOptions = {}) {
    super(`${resource} already exists`, { code: 'ALREADY', ...options });
  }
}

export class UserAlreadyExistsError extends AlreadyError {
  constructor(options: ErrorOptions = {}) {
    super('User', options);
    this.name = 'USER_ALREADY_EXISTS';
    (this as any).code = 'USER_ALREADY_EXISTS';
  }
}

export class UserNotFoundError extends NotFoundError {
  constructor(resource = 'User', options: ErrorOptions = {}) {
    super(`${resource} not found`, { code: 'USER_NOT_FOUND', ...options });
  }
}

export class ResourceNotFoundError extends NotFoundError {
  constructor(resource = 'Resource', options: ErrorOptions = {}) {
    super(`${resource} not found`, { code: 'RESOURCE_NOT_FOUND', ...options });
  }
}

export class ValidationError extends BadRequestError {
  constructor(message = 'Validation failed', options: ErrorOptions = {}) {
    super(message, { code: 'VALIDATION_ERROR', ...options });
  }
}
