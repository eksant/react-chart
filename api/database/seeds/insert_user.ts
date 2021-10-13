import { Knex } from 'knex';

const tableName = 'user';

export async function seed(knex: Knex): Promise<void> {
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert([
    { id: 1, email: 'admin@email.com', password: 'P@ssw0rd' },
  ]);
}
