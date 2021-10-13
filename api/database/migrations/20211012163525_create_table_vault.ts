import { Knex } from 'knex';

const tableName = 'vault';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (t) => {
    t.increments('id').notNullable();

    t.enum('name', ['Bitcoin', 'Ethereum']).notNullable();
    t.timestamp('date_time').defaultTo(knex.fn.now());
    t.float('price').notNullable();

    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
