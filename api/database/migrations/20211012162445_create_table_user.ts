import { Knex } from 'knex';

const tableName = 'user';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (t) => {
    t.increments('id').notNullable();

    t.string('email').notNullable();
    t.string('password').notNullable();

    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
