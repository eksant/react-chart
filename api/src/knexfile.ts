import { Knex } from 'knex';
import { join } from 'path';
import { config } from './config';

export default {
  client: 'sqlite3',
  connection: { filename: join(config.database.dir, config.database.name) },
  debug: false,
  pool: { min: 2, max: 10 },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: `${config.database.dir}/migrations`,
    loadExtensions: ['.ts'],
  },
  seeds: {
    extension: 'ts',
    directory: `${config.database.dir}/seeds`,
    loadExtensions: ['.ts'],
  },
} as Knex.Config;
