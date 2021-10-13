import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { Exception } from '../core/utils/error-response.util';
import { IUserLogDto, UserDto, TableUser, TableUserLog } from './auth.dto';

export class AuthService {
  async login({ email, password }: UserDto): Promise<any> {
    const payload = { email, password };
    const result = await TableUser().where(payload).first();

    if (!result) {
      throw new Exception(
        { code: 1001, message: 'Invalid email or password' },
        { httpStatus: 401 }
      );
    }

    const token = jwt.sign({ id: result.id, email }, config.server.jwtKey, {
      expiresIn: '8h',
    });
    Object.assign(payload, { token });

    // insert user log
    const payloadUserLog: IUserLogDto = { user_id: result.id, status: 'login' };
    await TableUserLog().insert(payloadUserLog);

    return payload;
  }

  async logout({ id }: any): Promise<any> {
    const payload: IUserLogDto = { user_id: id, status: 'logout' };
    await TableUserLog().insert(payload);

    return payload;
  }
}
