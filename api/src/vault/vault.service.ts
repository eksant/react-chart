import { TableVault, VaultDto } from './vault.dto';

export interface IFilterVault {
  name?: string;
  date_start?: string;
  date_end?: string;
}

export class VaultService {
  private normalizeWhere = (where: string) => {
    let result = where.trim();

    if (where.indexOf('and') > 0) {
      result = result.slice('and'.length).trim();
    }

    return result;
  };

  private parseWhereRaw({ name, date_start, date_end }: IFilterVault) {
    let parseKey: string = '';
    let parseVal: any[] = [];

    if (name) {
      parseKey = parseKey.concat(' and ', 'name like ?');
      parseVal.push(`%${name}%`);
    }

    if (date_start) {
      parseKey = parseKey.concat(' and ', 'date_time >= ? and date_time <= ?');
      parseVal.push(date_start);

      if (date_end) {
        parseVal.push(date_end);
      } else {
        parseVal.push(date_start);
      }
    }

    return { key: this.normalizeWhere(parseKey), val: parseVal };
  }

  async get({ name, date_start, date_end }: IFilterVault): Promise<any> {
    let result;

    if (name || date_start || date_end) {
      const q = this.parseWhereRaw({ name, date_start, date_end });
      result = await TableVault()
        .whereRaw(q.key, q.val)
        .orderBy('date_time', 'asc');
    } else {
      result = await TableVault().orderBy('date_time', 'asc');
    }

    return result;
  }

  async insert({ name, date_time, price }: VaultDto): Promise<any> {
    const payload = { name, date_time, price };
    const result = await TableVault().insert(payload);

    return result.length ? result.shift() : result;
  }
}
