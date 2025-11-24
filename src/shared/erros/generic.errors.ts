import { AppError, type ErrorOptions } from './base.error';

export class BadRequestError extends AppError {
  constructor(message = 'Bad request', options: ErrorOptions = {}) {
    super(message, { code: 'BAD_REQUEST', statusCode: 400, ...options });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', options: ErrorOptions = {}) {
    super(message, { code: 'UNAUTHORIZED', statusCode: 401, ...options });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', options: ErrorOptions = {}) {
    super(message, { code: 'FORBIDDEN', statusCode: 403, ...options });
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found', options: ErrorOptions = {}) {
    super(message, { code: 'NOT_FOUND', statusCode: 404, ...options });
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', options: ErrorOptions = {}) {
    super(message, { code: 'CONFLICT', statusCode: 409, ...options });
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Unprocessable entity', options: ErrorOptions = {}) {
    super(message, {
      code: 'UNPROCESSABLE_ENTITY',
      statusCode: 422,
      ...options,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error', options: ErrorOptions = {}) {
    super(message, {
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
      ...options,
    });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service unavailable', options: ErrorOptions = {}) {
    super(message, {
      code: 'SERVICE_UNAVAILABLE',
      statusCode: 503,
      ...options,
    });
  }
}
