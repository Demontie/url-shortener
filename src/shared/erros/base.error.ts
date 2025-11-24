export type ErrorDetails = Record<string, unknown>;
export type ErrorMetadata = Record<string, unknown>;

export interface ErrorOptions {
  code?: string;
  statusCode?: number;
  cause?: Error;
  details?: ErrorDetails;
  metadata?: ErrorMetadata;
}

export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;
  readonly details?: ErrorDetails;
  readonly metadata?: ErrorMetadata;
  readonly cause?: Error;

  constructor(message: string, options: ErrorOptions = {}) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = options.code ?? 'APP_ERROR';
    this.code = options.code ?? 'APP_ERROR';
    this.statusCode = options.statusCode ?? 500;
    this.details = options.details;
    this.metadata = options.metadata;
    this.cause = options.cause;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      metadata: this.metadata,
    };
  }
}
