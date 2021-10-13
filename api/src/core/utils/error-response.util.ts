import { Response } from 'express';

type ExceptionValue = {
  code: number;
  message: string;
};

type ExceptionOptions = {
  httpStatus?: number;
};

export class Exception {
  readonly code: number;
  readonly message: string;
  readonly httpStatus: number;

  constructor(value: ExceptionValue, options?: ExceptionOptions) {
    this.code = value.code;
    this.message = value.message;
    this.httpStatus = options?.httpStatus || 500;
  }
}

export class ErrorResponse {
  private readonly code: number;
  private readonly res: Response;
  private readonly message: string;
  private readonly httpStatus: number;

  constructor(error: unknown, res: Response) {
    this.res = res;

    if (error instanceof Exception) {
      this.code = error.code;
      this.message = error.message;
      this.httpStatus = error.httpStatus;
    } else {
      this.code = 1000;
      this.message = (error as Error).message;
      this.httpStatus = 500;
    }
  }

  private toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }

  send() {
    return this.res.status(this.httpStatus).send(this.toJSON());
  }
}
