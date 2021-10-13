import { knex } from 'knex';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import knexConfig from '../knexfile';

export interface IVaultDto {
  id: number;
  name: string;
  date_time: Date;
  price: number;
}

export class VaultDto implements IVaultDto {
  id: number;

  @IsString({ context: { code: 6020 } })
  @IsNotEmpty({ context: { code: 6021 } })
  @IsIn(['Bitcoin', 'Ethereum'], { context: { code: 6022 } })
  name: string;

  @IsString({ context: { code: 6023 } })
  @IsNotEmpty({ context: { code: 6024 } })
  // @IsDate({ context: { code: 6025 } })
  date_time: Date;

  @IsNumber(undefined, { context: { code: 6025 } })
  @IsNotEmpty({ context: { code: 6026 } })
  price: number;

  constructor(data: IVaultDto) {
    this.id = data.id;
    this.name = data.name;
    this.date_time = data.date_time;
    this.price = data.price;
  }
}

export const TableVault = () => knex(knexConfig)<IVaultDto>('vault');
