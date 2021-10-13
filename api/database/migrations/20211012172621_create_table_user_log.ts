import { Knex } from 'knex';

const tableName = 'user_log';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (t) => {
    t.increments('id').notNullable();

    t.integer('user_id').notNullable();
    t.string('status').notNullable();

    t.foreign('user_id').references('id').inTable('user');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
