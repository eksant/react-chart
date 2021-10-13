import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { IUserDto } from '../auth/auth.dto';
import { NextFunction, Request, Response } from 'express';
import { Exception, ErrorResponse } from './utils/error-response.util';

const parseToken = (token: string | undefined) => {
  if (token && token.includes('Bearer ')) {
    return token.slice('Bearer '.length);
  }

  return '';
};

export const jwtVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Exception(
        {
          code: 1003,
          message: 'Authorization header not provided or empty',
        },
        { httpStatus: 403 }
      );

      return new ErrorResponse(error, res).send();
    }

    const token = parseToken(authorization);
    const result = jwt.verify(token, config.server.jwtKey);

    req.auth = result as IUserDto;
    next();
  } catch (error) {
    const exception = new Exception(
      {
        code: 1001,
        message:
          error instanceof Error
            ? error.message
            : 'Something wrong in your token',
      },
      { httpStatus: 403 }
    );
    new ErrorResponse(exception, res).send();
  }
};
