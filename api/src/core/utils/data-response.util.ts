import { Response } from 'express';

export class DataResponse<Data> {
  private readonly data: Data;
  private readonly res: Response;
  private readonly httpStatus: number;

  constructor(data: Data, res: Response, options?: { httpStatus?: number }) {
    this.res = res;
    this.data = data;
    this.httpStatus = options?.httpStatus || 200;
  }

  private toJSON() {
    return { data: this.data ?? null };
  }

  send() {
    return this.res.status(this.httpStatus).send(this.toJSON());
  }
}
