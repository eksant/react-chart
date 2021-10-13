import { knex } from 'knex';
import { IsNotEmpty, IsString } from 'class-validator';
import knexConfig from '../knexfile';

export interface IUserDto {
  id: number;
  email: string;
  password: string;
}

export interface IUserLogDto {
  user_id: number;
  status: string;
}

export class UserDto implements IUserDto {
  id: number;

  @IsString({ context: { code: 6010 } })
  @IsNotEmpty({ context: { code: 6011 } })
  email: string;

  @IsString({ context: { code: 6012 } })
  @IsNotEmpty({ context: { code: 6013 } })
  password: string;

  constructor(data: IUserDto) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
  }
}

export const TableUser = () => knex(knexConfig)<IUserDto>('user');

export const TableUserLog = () => knex(knexConfig)<IUserLogDto>('user_log');
